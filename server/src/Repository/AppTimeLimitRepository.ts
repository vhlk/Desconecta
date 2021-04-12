import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';

const getAppTimeUser = (req: Request, res: Response, next: NextFunction) => {
    const query = `SELECT * FROM AppTimeLimit WHERE AppTimeLimit.User_ID =  ${req.params.userId}`;

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

const InsertAppTimeUser = (req: Request, res: Response, next: NextFunction) => {
    const query = `Insert Into AppTimeLimit(Whatsapp, Facebook, Instagram, Twitter, TikTok, User_ID) VALUES (${req.params.whatsapp}, ${req.params.facebook}, ${req.params.instagram}, ${req.params.twitter}, ${req.params.tiktok}, ${req.params.userId})`;

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

const UpdateAppTimeUser = (req: Request, res: Response, next: NextFunction) => {
    const query = `UPDATE AppTimeLimit Set Whatsapp = ${req.params.whatsapp}, Facebook = ${req.params.facebook}, Instagram = ${req.params.instagram}, Twitter = ${req.params.twitter}, TikTok = ${req.params.tiktok} WHERE AppTimeLimit.User_ID = ${req.params.userId}`;

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
export default { getAppTimeUser, InsertAppTimeUser, UpdateAppTimeUser };

