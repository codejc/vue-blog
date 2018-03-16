import mysql from "mysql";
import config from "../config";

const pool = mysql.createPool(config.db);

// 查询
const query = (sql, callback) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            // Use the connection
            // console.log(params)
            connection.query(sql, (error, results, fields) => {
                // And done with the connection.
                // Handle error after the release.
                connection.release();
                if (error) reject(error);
                resolve(results);
                // Don't use the connection here, it has been returned to the pool.
            });
        });
    });
};

export default query;
