import express from "express";
import article from "./article";
import user from "./user";
import tag from "./tag";
import link from "./link";
import comment from "./comment";
import upload from "./upload";
import record from "./record";
import like from "./like";

const router = express.Router();

router.use(article);
router.use(user);
router.use(tag);
router.use(link);
router.use(comment);
router.use(upload);
router.use(record);
router.use(like);

export default router;

