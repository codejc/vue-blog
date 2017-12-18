const exp = require("express");
const bodyParser = require("body-parser");
const template = require("art-template");
const mongoose = require("mongoose");
const app = exp();
// Schema 数据库模型，一种以文件形式存储的数据库模型骨架
const Schema = mongoose.Schema;
const Article = require("../db/schema").Article;
// 创建文章模型
const articleSchema = Schema({
    title: String,
    content: String,
    account: String,
    date: String
}, {
    collection: "Articles"
});

// 获取文章列表
app.get("/", (req, res) => {
    Article.find((error, data) => {
        if (error) {
            res.send("获取首页数据失败");
        } else {
            console.log
            res.send(data);
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
