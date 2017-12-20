/* eslint array-callback-return: 0 */
const exp = require("express");
const bodyParser = require("body-parser");
const app = exp();
const createApi = require("./api/index.js");
const port = "9090";
const colors = require("colors");
// createApi(app);
const db = require("./db/db.js");
require("./api/index.js");
// 跨域设置
app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    // res.header("Content-Type", "application/json;charset=utf-8")
    next();
});
app.use(exp.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

// // 登录检验
// app.post("/api/v1/login", (req, res) => {
//     console.log(req.body);
//     const user = User(req.body);
//     const paccount = user.account;
//     const password = user.password;
//     User.findOne({
//         account: paccount
//     }, (err, puser) => {
//         if (err) {
//             console.log(err);
//         }
//         if (!puser) {
//             console.log("不存在");
//             res.send({
//                 isHas: "false",
//                 isRight: "false"
//             });
//         } else if (puser && puser.password !== password) {
//             console.log("存在");
//             console.log("密码不正确");
//             console.log(puser.password + "--" + password);
//             res.send({
//                 isHas: "true",
//                 isRight: "false"
//             });
//         } else if (puser && puser.password === password) {
//             console.log("存在");
//             console.log("密码正确");
//             res.send({
//                 isHas: "true",
//                 isRight: "true"
//             });
//         }
//     });
// });
// // 添加一个用户
// app.post("/api/v1/adduser", (req, res) => {
//     const user = User(req.body);
//     user.save((error) => {
//         if (error) {
//             res.json({
//                 code: "error",
//                 mssage: "添加失败"
//             });
//         } else {
//             res.json({
//                 code: "success",
//                 mssage: "添加成功"
//             });
//         }
//     });
// });

// // 添加评论
// app.post("/api/v1/addcomment", (req, res) => {
//     // var comment = ArticleComment()
//     console.log(req);
//     ArticleComment.update({
//         articleID: req.body.articleID
//     }, {
//         "$push": {
//             "comments": {
//                 name: req.body.name,
//                 date: req.body.date,
//                 content: req.body.content
//             }
//         }
//     }, {
//         upsert: true
//     }, (err, docs) => {
//         if (err) console.log(err);
//         console.log("更改成功：" + docs);
//     });
// });

const server = app.listen(port, (req, res) => {
    console.log(`> server listening at localhost:${port}`.green);
});

