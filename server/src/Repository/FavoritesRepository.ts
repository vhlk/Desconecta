import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';

const getUserFavorite = (req: Request, res: Response, next: NextFunction) => {
  const query = `Select Favorites.Activities_ID, Activities.Title, Activities.Description, Activities.Duration, Activities.ImageLink, Category.Name From Favorites Join Activities On Activities.ID = Favorites.Activities_ID Join Category On Category.ID = Activities.Category_ID WHERE Favorites.User_ID = ${req.params.userId}`;

  Connect()
    .then(connection => {
      Query(connection, query)
        .then(results => {
          return res.status(200).json(results);
        })
        .catch(err => {
          return res.status(500).json({
            message: err.message,
            err,
          });
        })
        .finally(() => {
          connection.end();
        });
    })
    .catch(err => {
      return res.status(500).json({
        message: err.message,
        err,
      });
    });
};

const insertFavorite = (req: Request, res: Response, next: NextFunction) => {
  const query = `Insert into Favorites(User_ID, Activities_ID) Values (${req.params.userId}, ${req.params.activityId})`;

  Connect()
    .then(connection => {
      Query(connection, query)
        .then(results => {
          return res.status(200).json(results);
        })
        .catch(err => {
          return res.status(500).json({
            message: err.message,
            err,
          });
        })
        .finally(() => {
          connection.end();
        });
    })
    .catch(err => {
      return res.status(500).json({
        message: err.message,
        err,
      });
    });
};

const deleteFavorite = (req: Request, res: Response, next: NextFunction) => {
  const query = `Delete from Favorites WHERE Favorites.User_ID = ${req.params.userId} AND Favorites.Activities_ID = ${req.params.activityId}`;

  Connect()
    .then(connection => {
      Query(connection, query)
        .then(results => {
          return res.status(200).json(results);
        })
        .catch(err => {
          return res.status(500).json({
            message: err.message,
            err,
          });
        })
        .finally(() => {
          connection.end();
        });
    })
    .catch(err => {
      return res.status(500).json({
        message: err.message,
        err,
      });
    });
};

export default { getUserFavorite, insertFavorite, deleteFavorite };
