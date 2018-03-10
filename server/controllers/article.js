
const Article = require("../models/article");
const { error, success } = require("../util/toJson");

module.exports = (router) => {
    // 获取文章列表
    router.post("/getArticleList", async (req, res) => {
        // 分页
        const pageSize = req.body.pageSize;
        const offset = (req.body.pageNo - 1) * pageSize;
        const tag = req.body.tag;
        const keyword = req.body.keyword;

        try {
            const data = await Article.getList({ offset, pageSize, tag, keyword });
            [].forEach.call(data, item => {
                if (item.content.length >= 150) {
                    item.content = `${item.content.substring(0, 150)}...`;
                }
            });
            res.json(success(data));
        } catch (e) {
            res.json(error());
        }
    })
    .post("/getArticleById", async (req, res) => {
        const id = req.body.id;
        try {
            const article = await Article.getArticle(id);
            const comments = await Article.getCommentsById(id);
            const data = { ...article[0], commentList: comments };
            res.json(success(data));
        } catch (e) {
            res.json(error());
        }
    })
    .post("/doLikeById", async (req, res) => {
        const id = req.body.id;
        try {
            const oldVal = await Article.getLikeById(id);
            await Article.doLikeById(id, ++oldVal[0].likes);
            res.json({
                responseCode: "1000",
                responseMessage: "处理成功",
                success: true
            });
        } catch (e) {
            res.json(error());
        }
    });
};
