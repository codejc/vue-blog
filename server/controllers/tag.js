
import { Tag } from "../models";

export default (router) => {
    // 获取tag列表
    router.post("/getTags", async (req, res) => {
        try {
            const data = await Tag.getTags();
            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    // 获取tag列表
    .post("/admin/getTags", async (req, res) => {
        try {
            const data = await Tag.getTags(req.body.keyword);
            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    .post("/admin/createTag", async (req, res) => {
        try {
            const data = await Tag.addTag(req.body.value);
            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    .post("/admin/delTag", async (req, res) => {
        try {
            const data = await Tag.delTag(req.body.id);
            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    });
};

