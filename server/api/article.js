
import express from "express";
import {
    getArticles,
    getArticleById,
    doLikeById
} from "../controllers/article";

const router = express.Router();

// console.log("fn", getArticleList);
// 获取文章列表

router.post("*/getArticleList", getArticles)
.post("*/getArticleById", getArticleById)
.post("*/doLikeById", doLikeById);

export default router;
