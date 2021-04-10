import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';

const getAllFavorites = (req: Request, res: Response, next: NextFunction) => {
    const query = 'SELECT * FROM Favorites';

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            return res.status(200).json(results);
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message,
                err
            });
        })
        .finally(() => {
            connection.end();
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message,
                err
        });
    });
};

const getFavorite = (req: Request, res: Response, next: NextFunction) => {
    const query = `Select Favorites.Activities_ID, Activities.Title, Activities.Description, Activities.Duration, Category.Name From Favorites Join Activities On Activities.ID = Favorites.Activities_ID AND Favorites.Activities_ID = ActivitiesIdInput Join Category On Category.ID = ${req.params.favoriteId} WHERE Favorites.User_ID = ${req.params.userId}`;

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            return res.status(200).json(results);
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message,
                err
            });
        })
        .finally(() => {
            connection.end();
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message,
                err
        });
    });
};

const insertFavorite = (req: Request, res: Response, next: NextFunction) => {
    const query = `Insert into FavoritesFavorites(User_ID, Activities_ID) Values (${req.params.userId}, ${req.params.favoriteId})`;

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            return res.status(200).json(results);
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message,
                err
            });
        })
        .finally(() => {
            connection.end();
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message,
                err
        });
    });
};

const deleteFavorite = (req: Request, res: Response, next: NextFunction) => {
    const query = `Delete from Favorites WHERE Favorites.User_ID = ${req.params.userId} AND Favorites.Activities_ID = ${req.params.favoriteId}`;

    Connect()
    .then(connection => {
        Query(connection, query)
        .then(results => {
            return res.status(200).json(results);
        })
        .catch(err => {
            return res.status(500).json({
                message: err.message,
                err
            });
        })
        .finally(() => {
            connection.end();
        })
    })
    .catch(err => {
        return res.status(500).json({
            message: err.message,
                err
        });
    });
};

export default { getAllFavorites, getFavorite, insertFavorite, deleteFavorite };