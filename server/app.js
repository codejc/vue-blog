const exp = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = exp();
const colors = require("colors");
const PORT = "8888";
const db = require("./db");
const api = require("./controllers");
const session = require("express-session");
const mysql = require("mysql");
// 跨域设置
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 需在跨域请求后执行，不然接收不到数据
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 应用cookie进行，在登录时给用户一个sessionId。
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}));

app.all("/*", (req, res, next) => {
    // console.log(req.body);
    // 没登录，则返回 1008码
    // if (!req.session.user) {
    //     res.json({
    //         data: {},
    //         status:{
    //             code: 1008,
    //             msg: "用户未登录"
    //         }
    //     });
    // }
    next();
});
// 调用api
app.use(api);

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
