const exp = require("express");
const bodyParser = require("body-parser");
const app = exp();
const Article = require("../db/schema").Article;
// 获取文章列表
app.post("/read/articleList", (req, res) => {
    console.log("article");
    Article.find((error, data) => {
        if (error) {
            res.send("获取首页数据失败");
        } else {
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

module.exports = app;
