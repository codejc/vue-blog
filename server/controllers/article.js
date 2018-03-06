
const Article = require("../models/article");
const toJson = require("../util/toJson");
module.exports = (router) => {
    // 获取文章列表
    router.post("/getArticleList", async (req, res) => {
        // 分页
        const pageSize = req.body.pageSize;
        const offset = (req.body.pageNo - 1) * pageSize;
        const tag = req.body.tag;
        const keyword = req.body.keyword;
            
        try {
            const data = await Article.get({ offset, pageSize, tag, keyword });
            console.log("data", data);
            res.json(toJson(data));
        } catch(e) {
            // console.log(e);
            res.json(toJson());
        }
    });
};
