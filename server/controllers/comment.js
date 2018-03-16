import Comment from "../models/comment";
import { error, success } from "../util/toJson";
import exp from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const app = exp();

const router = exp.Router();

// 回复
router.post("/comment", async (req, res) => {
    try {
        if (!req.body.root) {
            const comments = await Comment.getCommentsLength();
            if (!comments[0].length) {
                req.body.root = 0;
            } else {
                req.body.root = ++comments[0].length;
            }
        }
        await Comment.addComment(req.body);
        res.json(success());
    } catch (e) {
        console.log(e);
        res.json(error());
    }
})
.post("/getCommentGroup", async (req, res) => {
    try {
        const data = await Comment.getGropByRoot(req.body.root);
        res.json(success(data));
    } catch (e) {
        console.log(e);
        res.json(error());
    }
});

export default router;

