export default (router) => {
    // 获取Link列表
    router.post("/admin/getLinks", async (req, res) => {
        try {
            const data = await req.models.link.getLinks(req.body.keyword);
            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    // 获取Link列表(blog)
    .post("/getLinks", async (req, res) => {
        try {
            const data = await req.models.link.getLinks();
            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    // 创建链接
    .post("/admin/createLink", async (req, res) => {
        try {
            const data = await req.models.link.addLink(req.body);
            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    // 编辑链接
    .post("/admin/updateLink", async (req, res) => {
        try {
            const data = await req.models.link.updateLink(req.body);
            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    .post("/admin/delLink", async (req, res) => {
        try {
            const data = await req.models.link.delLink(req.body.id);
            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    });
};

