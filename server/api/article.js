
const Article = require("../db").Article;

module.exports = (router) => {
    // 获取文章列表
    router.post("/getArticleList", function (req, res) {
        // 分页
        const pageSize = req.body.pageSize;
        const pageNo = (req.body.pageNo - 1) * pageSize;

        Article.find().skip(pageNo).limit(pageSize).exec((error, data) => {
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
