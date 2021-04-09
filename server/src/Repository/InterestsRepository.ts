import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';

const getInterests = (req: Request, res: Response, next: NextFunction) => {
    const query = `Select Interests.Category_ID, Category.Name From Interests Join Category On Category.ID = Interests.Category_ID WHERE Interests.User_ID = ${req.params.userId}`;

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

const insertInterests = (req: Request, res: Response, next: NextFunction) => {
    const query = `Insert into Interests Values (User_ID, Category_ID) Values (${req.params.userId}, ${req.params.categoryId})`;

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

const deleteInterests = (req: Request, res: Response, next: NextFunction) => {
    const query = `Delete from Interests WHERE Interests.User_ID = ${req.params.userId} AND Interests.Category_ID = ${req.params.categoryId}`;

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

export default {getInterests, insertInterests, deleteInterests};