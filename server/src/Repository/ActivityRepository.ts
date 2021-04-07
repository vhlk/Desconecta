import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';
//Falta o Activity por Category_ID
//SELECT * FROM Activities WHERE Activities.Category_ID = IdInput
const getAllActivities = (req: Request, res: Response, next: NextFunction) => {
    const query = 'SELECT * FROM Activities LEFT JOIN Image On Image.Activity_ID = Activites.ID';

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

export default { getAllActivities };