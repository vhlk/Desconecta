import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';

const getUserGoal = (req: Request, res: Response, next: NextFunction) => {
    const query = `Select Goals.Name From User_Goals Join Goals On User_Goals.Goal_ID = Goals.ID WHERE User_Goals.User_ID = ${req.params.userId}`;

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

const insertUserGoal = (req: Request, res: Response, next: NextFunction) => {
    const query = `Insert into User_Goals(Name, Goal_ID, User_ID) Values (NULL, ${req.params.goalId}, ${req.params.userId})`;

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

const deleteUserGoal = (req: Request, res: Response, next: NextFunction) => {
    const query = `Delete from User_Goals WHERE User_Goals.Goal_ID = ${req.params.goalId} AND User_Goals.User_ID = ${req.params.userId}`;

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

export default { getUserGoal, insertUserGoal, deleteUserGoal};