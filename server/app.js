import exp from "express";
import bodyParser from "body-parser";
import colors from "colors";
import db from "./db";
import setRouter from "./controllers";
import mysql from "mysql";
import config from "./config";
import jwt from "jsonwebtoken"; // 使用jwt签名
import { error, success } from "./util/toJson";
import path from "path";
const app = exp();
const router = exp.Router();
const PORT = "8888";

// 设置静态资源目录
app.use(exp.static(path.join(__dirname, "assets")));

// 跨域设置
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 设置全局参数 superSecret
app.set("jwtSecret", config.jwtSecret);

// 需在跨域请求后执行，不然接收不到数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 调用api
// app.use(api);
app.use(setRouter(router));

const processErrorHandler = (e) => {
    console.log(e);
};
process.on("unhandledRejection", processErrorHandler);
const server = app.listen(PORT, (req, res) => {
    console.log(`sever run at localhost:${PORT}`.green);
});
// var io = require("socket.io")(server);
// io.on("connection", function (socket) {
//   socket.on("message", function (obj) {
//     //向所有客户端广播发布的消息
//     var mess = {
//       username: obj.name,
//       msg: obj.msg,
//     }
// })
