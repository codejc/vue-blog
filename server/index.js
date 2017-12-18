/* eslint array-callback-return: 0 */
const exp = require("express");
const bodyParser = require("body-parser");
const template = require("art-template");
const mongoose = require("mongoose");
const app = exp();
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

// 设置连接数据库地址
mongoose.connect("mongodb://localhost:27017/data");
// 连接数据库
const db = mongoose.connection;
// 连接数据库的两种状态
// 失败
db.on("error", () => {
    console.log("连接数据库失败");
});
// 成功
db.once("open", () => {
    console.log("连接数据库成功");
});
// Schema 数据库模型，一种以文件形式存储的数据库模型骨架
const Schema = mongoose.Schema;

// 创建用户数据库模型，第一个参数是模型(表)的内容,第二个参数是模型(表)名字
const userSchema = Schema({
    account: String,
    password: Number
}, {
    collection: "Users"
});
// 创建文章模型
const articleSchema = Schema({
    title: String,
    content: String,
    account: String,
    date: String
}, {
    collection: "Articles"
});
// 创建评论模型
const commentSchema = Schema({
    articleID: String,
    comments: Array
}, {
    collection: "Comments"
});

// 根据创建的用户数据库模型创建用户模型(构造函数)
// User 由 schema 生成的模型，具有抽象属性和行为的数据库操作对
const User = mongoose.model("User", userSchema);
const Article = mongoose.model("Article", articleSchema);
const ArticleComment = mongoose.model("Comments", commentSchema);
// 获取首页数据
app.get("/", (req, res) => {
    // User.findOne()
    Article.find((error, data) => {
        if (error) {
            res.send("获取首页数据失败");
        } else {
            res.send(data);
        }
    });
});


// 登录检验
app.post("/api/v1/login", (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    const paccount = user.account;
    const password = user.password;
    User.findOne({
        account: paccount
    }, (err, puser) => {
        if (err) {
            console.log(err);
        }
        if (!puser) {
            console.log("不存在");
            res.send({
                isHas: "false",
                isRight: "false"
            });
        } else if (puser && puser.password !== password) {
            console.log("存在");
            console.log("密码不正确");
            console.log(puser.password + "--" + password);
            res.send({
                isHas: "true",
                isRight: "false"
            });
        } else if (puser && puser.password === password) {
            console.log("存在");
            console.log("密码正确");
            res.send({
                isHas: "true",
                isRight: "true"
            });
        }
    });
});
// 添加一个用户
app.post("/api/v1/adduser", (req, res) => {
    const user = User(req.body);
    user.save((error) => {
        if (error) {
            res.json({
                code: "error",
                mssage: "添加失败"
            });
        } else {
            res.json({
                code: "success",
                mssage: "添加成功"
            });
        }
    });
});
// 添加文章
app.post("/api/v1/addarticle", (req, res) => {
    const article = Article(req.body);
    article.save((error) => {
        if (error) {
            res.json({
                code: "error",
                mssage: "添加失败"
            });
        } else {
            res.json({
                code: "success",
                mssage: "添加成功"
            });
        }
    });
});

// 修改文章
app.post("/api/v1/edit/:id", (req, res) => {
    Article.findByIdAndUpdate(req.params.id, req.body, (error) => {
        if (error) {
            res.json({
                code: "error",
                message: "数据更新失败"
            });
        } else {
            res.json({
                code: "success",
                message: "数据更新成功"
            });
        }
    });
});

// 删除文章
app.post("/api/v1/remove/:id", (req, res) => {
    Article.findByIdAndRemove(req.params.id, (error) => {
        if (error) {
            res.json({
                code: "error",
                message: "数据删除失败"
            });
        } else {
            res.json({
                code: "success",
                message: "数据删除成功"
            });
        }
    });
});
// 获取评论列表
app.get("/comments/:id", (req, res) => {
    // User.findOne()
    ArticleComment.find({
        articleID: req.params.id
    }, (error, data) => {
        if (error) {
            res.send("获取首页数据失败");
        } else {
            res.send(data);
        }
    });
});
// 添加评论
app.post("/api/v1/addcomment", (req, res) => {
    // var comment = ArticleComment()
    console.log(req);
    ArticleComment.update({
        articleID: req.body.articleID
    }, {
        "$push": {
            "comments": {
                name: req.body.name,
                date: req.body.date,
                content: req.body.content
            }
        }
    }, {
        upsert: true
    }, (err, docs) => {
        if (err) console.log(err);
        console.log("更改成功：" + docs);
    });
});
// // 删除用户
// app.post("/api/v1/remove/:id", function (req, res) {
//     User.findByIdAndRemove(req.params.id, function (error) {
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

const server = app.listen(9090, (req, res) => {
    console.log("服务器运行在3000端口......");
});
