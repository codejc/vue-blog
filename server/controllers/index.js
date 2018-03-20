import express from "express";
import article from "./article";
import user from "./user";
import tag from "./tag";
import comment from "./comment";
import upload from "./upload";
const router = express.Router();

router.use(article);
router.use(user);
router.use(tag);
router.use(comment);
router.use(upload);

export default router;

