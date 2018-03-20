
import Tag from "../models/tag";
import express from "express";

const router = express.Router();

// 获取tag列表
router.post("/admin/getTags", async (req, res) => {
    try {
        const data = await Tag.getTags();
        res.json({ code: "1000", message: "处理成功", data, success: true });
    } catch (e) {
        console.log(e);
        res.json({ code: "1001", message: "数据库查询失败", success: false });
    }
});
export default router;
