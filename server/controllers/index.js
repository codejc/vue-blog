import express from "express";
import article from "./article";
import user from "./user";
import comment from "./comment";
const router = express.Router();

router.use(article);
router.use(user);
router.use(comment);

export default router;

