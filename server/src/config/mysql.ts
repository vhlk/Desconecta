import MySQL from 'mysql2';
import config from './config';

const params = {
    user: config.mysql.user,
    password: config.mysql.password,
    host: config.mysql.host,
    database: config.mysql.database
};

const Connect = async () => 
    new Promise<MySQL.Connection>((resolve, reject) => {
        const connection = MySQL.createConnection(params);

        connection.connect((err) => {
            if(err) {
                reject(err);
                return;
            }

            resolve(connection);
        });
    });

const Query = async (connection: MySQL.Connection, query: string) =>
    new Promise((resolve, reject) => {
        connection.query(query, connection, (err, result) => {
            if(err) {
                reject(err);
                return;
            }

            resolve(result);
        });
    });

export { Connect, Query };

