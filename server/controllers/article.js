
import Article from "../models/article";
import Comment from "../models/comment";
import View from "../models/view";
import { error, success } from "../util/toJson";
import express from "express";
import marked from "marked";
import Like from "../models/like";

const router = express.Router();
// 获取文章列表
router.post("/getArticleList", async (req, res) => {
    // 分页
    const { pageSize, tag, keyword, pageNo } = req.body;
    const offset = (pageNo - 1) * pageSize;
    const newArr = [];
    try {
        let data = await Article.getList({ offset, pageSize, tag, keyword });
        for (let i = 0; i < data.length; i++) {
            // 获取文章点赞数, 浏览数
            data[i].likes = (await Like.getLikesById(data[i].id)).length;
            data[i].views = (await View.getViewsById(data[i].id)).length;

            // blog端只接受发布了的文章
            if (!data[i].publish) return;
            // 解析markdown，去除html标签，传回纯文本，用于文章缩略卡片展示
            const markedContent = marked(data[i].content).replace(/<\/?.+?>/g, "");
            data[i].content = markedContent;
            if (markedContent.length >= 150) {
                data[i].content = `${markedContent.substring(0, 150)}...`;
            }
            newArr.push(data[i]);
        }
        data = newArr;
        res.json({ code: "1000", message: "处理成功", data, success: true });
    } catch (e) {
        res.json({ code: "1001", message: "数据库查询失败", success: false });
    }
})

// 根据id获取文章详情及其评论
.post("/getArticleById", async (req, res) => {
    const id = req.body.id;
    try {
        const article = (await Article.getArticle(id))[0];
        const commentList = await Comment.getCommentsById(id);
        const likes = (await Like.getLikesById(id)).length;
        // 当请求获取文章接口时，添加一条浏览记录
        await View.AddViewsById({ id, tag: article.tag, title: article.title });
        const views = (await View.getViewsById(id)).length;
        article.content = marked(article.content);

        const data = { ...article, commentList, likes, views };
        res.json({ code: "1000", message: "处理成功", data, success: true });
    } catch (e) {
        console.log(e);
        res.json({ code: "1001", message: "数据库查询失败", success: false });
    }
})
// admin 获取文章列表
.post("/admin/getArticleList", async (req, res) => {
    // 分页
    const { pageSize = 10, tag, keyword, pageNo } = req.body;
    const offset = (pageNo - 1) * pageSize;
    try {
        const articles = await Article.getList({ offset, pageSize, tag, keyword });
        const total = articles.length;
        for (let i = 0; i < articles.length; i++) {
            // 获取文章点赞数
            articles[i].likes = (await Like.getLikesById(articles[i].id)).length;
            articles[i].views = (await View.getViewsById(articles[i].id)).length;

            delete articles[i].content;
        }
        res.json({ code: "1000", message: "处理成功", data: { articles, total }, success: true });
    } catch (e) {
        console.log(e);
        res.json({ code: "1001", message: "数据库查询失败", success: false });
    }
})

// 根据id获取文章详情及其评论
.post("/admin/getArticleById", async (req, res) => {
    const { id } = req.body;
    try {
        const article = (await Article.getArticle(id))[0];
        const commentList = await Comment.getCommentsById(id);
        const likes = (await Like.getLikesById(id)).length;
        const views = (await View.getViewsById(id)).length;

        const data = { ...article, commentList, likes, views };
        res.json({ code: "1000", message: "处理成功", data, success: true });
    } catch (e) {
        res.json({ code: "1001", message: "数据库查询失败", success: false });
    }
})

.post("/admin/delArticle", async (req, res) => {
    const id = req.body.id;
    try {
        await Article.delArticle(id);
        res.json({ code: "1000", message: "处理成功", success: true });
    } catch (e) {
        console.log(e);
        res.json({ code: "1001", message: "数据库查询失败", success: false });
    }
})
.post("/admin/updateArticle", async (req, res) => {
    try {
        await Article.updateArticle(req.body);
        res.json({ code: "1000", message: "处理成功", success: true });
    } catch (e) {
        console.log(e);
        res.json({ code: "1001", message: "数据库查询失败", success: false });
    }
})
.post("/admin/publishArticle", async (req, res) => {
    try {
        await Article.updateStatus(req.body);
        res.json({ code: "1000", message: "处理成功", success: true });
    } catch (e) {
        console.log(e);
        res.json({ code: "1001", message: "数据库查询失败", success: false });
    }
});

export default router;
