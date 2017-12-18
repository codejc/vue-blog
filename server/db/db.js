/* eslint no-undef: 0 */
const mongoose = require("mongoose");
const colors = require("colors");
require("shelljs/global");

// ls().forEach(file => {
//     console.log(file);
// });
// exec("mongod");
// 设置连接数据库地址
mongoose.connect("mongodb://localhost:27017/data");
// 连接数据库
const db = mongoose.connection;

// 连接数据库的两种状态
db.on("error", () => {
    console.log("> database connect failed.".red);
});
// 成功
db.once("open", () => {
    console.log("> database connect success.".green);
});
