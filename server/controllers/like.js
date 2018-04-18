import express from "express";
import { Like } from "../models";

const router = express.Router();
// 根据id点赞文章
router.post("/doLikeById", async (req, res) => {
    const id = req.body.id;
    try {
        await Like.AddLikeById(id);
        res.json({ code: "1000", message: "处理成功", success: true });
    } catch (e) {
        res.json({ code: "1001", message: "数据库查询失败", success: false });
    }
});

export default router;
