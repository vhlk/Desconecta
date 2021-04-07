import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    const query = 'SELECT * FROM User';

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

export default { getAllUsers };