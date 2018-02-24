
const Article = require("../models/article");

module.exports = (router) => {
    // 获取文章列表
    router.post("/getArticleList", function (req, res) {
        // 分页
        const pageSize = req.body.pageSize;
        const pageNo = (req.body.pageNo - 1) * pageSize;
        const tag = req.body.tag;
        Article.get({ pageSize, pageNo, tag }, (error, data) => {
            if (error) {
                res.json({
                    responseCode: "1001",
                    responseMessage: "数据库查询失败！",
                    data: {},
                    success: false
                });
            } else {
                res.json({
                    responseCode: "1000",
                    responseMessage: "处理成功",
                    data: data,
                    success: false
                });
            }
        });
    });
};
