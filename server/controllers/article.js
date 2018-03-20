
import Article from "../models/article";
import Comment from "../models/comment";
import { error, success } from "../util/toJson";
import express from "express";
import marked from "marked";

const router = express.Router();
// 获取文章列表
router.post("/getArticleList", async (req, res) => {
    // 分页
    const { pageSize, tag, keyword, pageNo } = req.body;
    const offset = (pageNo - 1) * pageSize;

    try {
        const data = await Article.getList({ offset, pageSize, tag, keyword });
        [].forEach.call(data, item => {
            // 解析markdown，去除html标签，传回纯文本，用于文章缩略卡片展示
            const markedContent = marked(item.content).replace(/<\/?.+?>/g, "");
            item.content = markedContent;
            if (markedContent.length >= 150) {
                item.content = `${markedContent.substring(0, 150)}...`;
            }
        });
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
        const comments = await Comment.getCommentsById(id);
        article.content = marked(article.content);

        const data = { ...article, commentList: comments };
        res.json({ code: "1000", message: "处理成功", data, success: true });
    } catch (e) {
        res.json({ code: "1001", message: "数据库查询失败", success: false });
    }
})

// 根据id点赞文章
.post("/doLikeById", async (req, res) => {
    const id = req.body.id;
    try {
        const oldVal = await Article.getLikeById(id);
        await Article.updateLikesById(id, ++oldVal[0].likes);
        res.json({ code: "1000", message: "处理成功", success: true });
    } catch (e) {
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

        [].forEach.call(articles, item => {
            delete item.content;
        });
        res.json({ code: "1000", message: "处理成功", data: { articles, total }, success: true });
    } catch (e) {
        console.log(e);
        res.json({ code: "1001", message: "数据库查询失败", success: false });
    }
})

// 根据id获取文章详情及其评论
.post("/admin/getArticleById", async (req, res) => {
    const id = req.body.id;
    try {
        const article = (await Article.getArticle(id))[0];
        const comments = await Comment.getCommentsById(id);

        const data = { ...article, commentList: comments };
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
});

export default router;
