
import express from "express";
import article from "./article";
import verify from "../middlewares/verify";

const router = express.Router();

// admin端的接口使用token验证中间件
router.all("/admin/*", verify);

router.use(article);

export default router;
