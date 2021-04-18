import { Request, Response, NextFunction } from 'express';
import { Connect, Query } from '../config/mysql';

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    const query = 'SELECT User.Name, User.Email FROM User';

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

const insertUser = (req: Request, res: Response, next: NextFunction) => {
    const query = `Insert Into User(Name, Email, Password) VALUES ("${req.params.name}", "${req.params.email}", "${req.params.password}")`;

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

const userAuth = (req: Request, res: Response, next: NextFunction) => {
    const query = `SELECT User.ID FROM User WHERE User.Password = "${req.params.password}" AND User.Email = "${req.params.email}" LIMIT 1`;

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


export default { getAllUsers, insertUser, userAuth  };