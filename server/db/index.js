const mysql = require("mysql");
const db = {};

const pool = mysql.createPool({
  host     : "localhost",
  user     : "root",
  password : "hjincong",
  database : "vue-blog"
});

//查询
db.query = (sql, callback) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            // Use the connection
            // console.log(params)
            connection.query(sql,(error, results, fields) => {
                // And done with the connection.
                // Handle error after the release.
                connection.release();
                if (error) reject(error);
                resolve(results);
                // Don't use the connection here, it has been returned to the pool.
            });
        });
    });
    
}

module.exports = db;  