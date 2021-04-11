import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';

const getAllActivities = (req: Request, res: Response, next: NextFunction) => {
    const query = 'SELECT * FROM Activities LEFT JOIN Image On Image.Activity_ID = Activities.ID';

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
const getActivityByID = (req: Request, res: Response, next: NextFunction) => {
    console.log("params: "+req.params)
    const query = `SELECT * FROM Activities LEFT JOIN Image On Image.Activity_ID = Activities.ID WHERE Activities.ID = ${req.params.activityId}`;

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

const getActivityByCategoryID = (req: Request, res: Response, next: NextFunction) => {
    const query = `SELECT * FROM Activities LEFT JOIN Image On Image.Activity_ID = Activities.ID WHERE Activities.Category_ID = ${req.params.categoryId}`;

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

export default { getAllActivities, getActivityByID, getActivityByCategoryID };

