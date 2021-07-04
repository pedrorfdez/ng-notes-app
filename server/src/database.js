const mysql = require('promise-mysql');

const { database } = require('./keys');

const pool = mysql.createPool(database);

pool.then((pool) => {
    pool.getConnection((err, connection) => {
        if (err) throw err;
        if (connection)
            connection.release();
        console.log(`Connected to database: ${database.database}`);
    })
});

module.exports = pool;