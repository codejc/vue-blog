
import Article from "../models/article";
import Comment from "../models/comment";
import { error, success } from "../util/toJson";
import express from "express";
import verify from "../middlewares/verify";
const router = express.Router();
// 获取文章列表
router.post("/getArticleList", async (req, res) => {
    // 分页
    const { pageSize, tag, keyword, pageNo } = req.body;
    const offset = (pageNo - 1) * pageSize;

    try {
        const data = await Article.getList({ offset, pageSize, tag, keyword });
        [].forEach.call(data, item => {
            if (item.content.length >= 150) {
                item.content = `${item.content.substring(0, 150)}...`;
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
        const article = await Article.getArticle(id);
        const comments = await Comment.getCommentsById(id);
        const data = { ...article[0], commentList: comments };
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
});

export default router;
