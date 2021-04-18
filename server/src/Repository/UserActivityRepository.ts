import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';

//select preciso perguntar como vai ser o dash board, se calcular por atividades por dia ou por tempo no dia

const insertUserActivity = (req: Request, res: Response, next: NextFunction) => {
    const query = `Insert Into User_Activities(Day, User_ID, Activities_ID, Time) Values (CurDate(), ${req.params.userId}, ${req.params.activityId}, CURTIME())`;

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

const getUserActivity = (req: Request, res: Response, next: NextFunction) => {
    const query = `select (Select SEC_TO_TIME( SUM( TIME_TO_SEC(Activities.Duration))) from User_Activities JOIN Activities ON Activities.ID = User_Activities.Activities_ID WHERE User_Activities.User_ID = ${req.params.userId} AND User_Activities.Day = CurDate()),
    (Select SEC_TO_TIME( SUM( TIME_TO_SEC(Activities.Duration))) from User_Activities JOIN Activities ON Activities.ID = User_Activities.Activities_ID WHERE User_Activities.User_ID = ${req.params.userId} AND User_Activities.Day = date_sub(CurDate(),interval 1 day)),
    (Select SEC_TO_TIME( SUM( TIME_TO_SEC(Activities.Duration))) from User_Activities JOIN Activities ON Activities.ID = User_Activities.Activities_ID WHERE User_Activities.User_ID = ${req.params.userId} AND User_Activities.Day = date_sub(CurDate(),interval 2 day)),
    (Select SEC_TO_TIME( SUM( TIME_TO_SEC(Activities.Duration))) from User_Activities JOIN Activities ON Activities.ID = User_Activities.Activities_ID WHERE User_Activities.User_ID = ${req.params.userId} AND User_Activities.Day = date_sub(CurDate(),interval 3 day)),
    (Select SEC_TO_TIME( SUM( TIME_TO_SEC(Activities.Duration))) from User_Activities JOIN Activities ON Activities.ID = User_Activities.Activities_ID WHERE User_Activities.User_ID = ${req.params.userId} AND User_Activities.Day = date_sub(CurDate(),interval 4 day)),
    (Select SEC_TO_TIME( SUM( TIME_TO_SEC(Activities.Duration))) from User_Activities JOIN Activities ON Activities.ID = User_Activities.Activities_ID WHERE User_Activities.User_ID = ${req.params.userId} AND User_Activities.Day = date_sub(CurDate(),interval 5 day)),
    (Select SEC_TO_TIME( SUM( TIME_TO_SEC(Activities.Duration))) from User_Activities JOIN Activities ON Activities.ID = User_Activities.Activities_ID WHERE User_Activities.User_ID = ${req.params.userId} AND User_Activities.Day = date_sub(CurDate(),interval 6 day))
    `;

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

const deleteUserActivity = (req: Request, res: Response, next: NextFunction) => {
    const query = `Delete from User_Activities WHERE User_Activities.User_ID = ${req.params.userId} AND User_Activities.Activities_ID = ${req.params.activityId}`;

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

export default { insertUserActivity, getUserActivity, deleteUserActivity };