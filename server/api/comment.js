import express from "express";
import {
    comment,
    getCommentGroup,
    getUserInfo
} from "../controllers/user";

const router = express.Router();

router.post("/blog/comment", comment)
.post("/blog/getCommentGroup", getCommentGroup)
.post("/blog/getUserInfo", getUserInfo);

export default router;
