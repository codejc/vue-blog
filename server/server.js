const exp = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = exp();
const colors = require("colors");  
const PORT = process.env.PORT;
const db = require("./db");
const api = require("./api");
const session = require("express-session");

// 跨域设置
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", " 3.2.1")
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
})
// 需在跨域请求后执行，不然接收不到数据
app.use(bodyParser.urlencoded({extended: false}));
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

app.all("/*", function(req, res, next) {
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

// // 获取文章列表
// app.post("/getArticleList", function (req, res) {
//     // User.findOne()
//     Article.find((error, data) => {
//         if (error) {
//             res.send("error");
//         } else {
//             // let temp = { ...data };
//             res.send(data);
//         }
//     })
// })

// // 登录检验
// app.post("/api/v1/login", function (req, res) {
//     console.log(req.body);
//     var user = User(req.body)
//     var account = user.account;
//     var password = user.password;
//     User.findOne({
//         account: account
//     }, function (err, user) {
//         if (err) {
//             console.log(err);
//         }
//         if (!user) {
//             console.log("不存在")
//             res.send({
//                 isHas: "false",
//                 isRight: "false"
//             });
//         } else if (user && user.password != password) {
//             console.log("存在")
//             console.log("密码不正确");
//             console.log(user.password + "--" + password);
//             res.send({
//                 isHas: "true",
//                 isRight: "false"
//             });
//         } else if (user && user.password == password) {
//             console.log("存在")
//             console.log("密码正确");
//             res.send({
//                 isHas: "true",
//                 isRight: "true"
//             });
//         }

//     });
// })
// // 添加一个用户
// app.post("/api/v1/adduser", function (req, res) {
//     var user = User(req.body)
//     console.log(req.body)
//     user.save(function (error) {
//         if (error) {
//             res.json({
//                 code: "error",
//                 mssage: "添加失败"
//             })
//         } else {
//             res.json({
//                 code: "success",
//                 mssage: "添加成功"
//             })
//         }
//     })
// })
// // 添加文章
// app.post("/api/v1/addarticle", function (req, res) {
//     var article = Article(req.body)
//     console.log(req.body)
//     article.save(function (error) {
//         if (error) {
//             res.json({
//                 code: "error",
//                 mssage: "添加失败"
//             })
//         } else {
//             res.json({
//                 code: "success",
//                 mssage: "添加成功"
//             })
//         }
//     })
// })

// // 跳转到修改页面
// app.get("/edit/:id", function (req, res) {
//     console.log(req.params.id)
//     User.findById(req.params.id, function (error, data) {
//         if (error) {
//             res.send("用户不存在")
//         } else {
//             var user = data.toObject()
//             user.id = user._id.toString()
//             delete user._id
//             res.render("edit", {
//                 user: user
//             })
//         }
//     })
// })
// // 修改文章
// app.post("/api/v1/edit/:id", function (req, res) {
//     Article.findByIdAndUpdate(req.params.id, req.body, function (error) {
//         if (error) {
//             res.json({
//                 code: "error",
//                 message: "数据更新失败"
//             })
//         } else {
//             res.json({
//                 code: "success",
//                 message: "数据更新成功"
//             })
//         }
//     })
// })

// // 删除文章
// app.post("/api/v1/remove/:id", function (req, res) {
//     Article.findByIdAndRemove(req.params.id, function (error) {
//         if (error) {
//             res.json({
//                 code: "error",
//                 message: "数据删除失败"
//             })
//         } else {
//             res.json({
//                 code: "success",
//                 message: "数据删除成功"
//             })
//         }
//     })
// })
// // 获取评论列表
// app.get("/comments/:id", function (req, res) {
//     // User.findOne()
//     ArticleComment.find({
//         articleID: req.params.id
//     }, function (error, data) {
//         if (error) {
//             res.send("获取首页数据失败")
//         } else {
//             res.send(data);
//         }
//     })
// })

// // 添加评论
// app.post("/api/v1/addcomment", function (req, res) {
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
//     }, function (err, docs) {
//         if (err) console.log(err);
//         console.log("更改成功：" + docs);
//     })
// })
// // // 删除用户
// // app.post("/api/v1/remove/:id", function (req, res) {
// //     User.findByIdAndRemove(req.params.id, function (error) {
// //         if (error) {
// //             res.json({
// //                 code: "error",
// //                 message: "数据删除失败"
// //             })
// //         } else {
// //             res.json({
// //                 code: "success",
// //                 message: "数据删除成功"
// //             })
// //         }
// //     })
// // })

const server = app.listen(PORT, function (req, res) {
    console.log(` ----------------------------- ` .green);
    console.log(`| sever run at localhost:${PORT} |` .green);
    console.log(` ----------------------------- ` .green);
})
// var io = require("socket.io")(server);
// io.on("connection", function (socket) {
  //监听用户发布聊天内容
//   socket.on("message", function (obj) {
//     //向所有客户端广播发布的消息
//     var mess = {
//       username: obj.name,
//       msg: obj.msg,
//     }
// })
