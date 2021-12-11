const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    databasee: process.env.MYSQL_DATABACE,
})
exports.pool = pool