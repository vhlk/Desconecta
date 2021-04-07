import dotenv from 'dotenv';

dotenv.config();

const MYSQL_PORT = process.env.MYSQL_PORT
const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_DATABASE = process.env.MYSQL_DATABASE
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_PWD = process.env.MYSQL_PWD

const MYSQL = {
    port: MYSQL_PORT,
    host: MYSQL_HOST,
    database: MYSQL_DATABASE,
    user: MYSQL_USER,
    password: MYSQL_PWD
}

const config = {
    mysql: MYSQL,
}

export default config