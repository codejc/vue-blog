import { error, success } from "../util/toJson";
import jwt from "jsonwebtoken";
import config from "../config";

export default (router) => {
    // 回复
    router.post("/comment", async (req, res) => {
        try {
            if (!req.body.root) {
                const comments = await req.models.comment.getCommentsLength();
                if (!comments[0].length) {
                    req.body.root = 0;
                } else {
                    req.body.root = ++comments[0].length;
                }
            }
            await req.models.comment.addComment(req.body);
            res.json(success());
        } catch (e) {
            console.log(e);
            res.json(error());
        }
    })
    .post("/getCommentGroup", async (req, res) => {
        try {
            const data = await req.models.comment.getGropByRoot(req.body.root);
            res.json(success(data));
        } catch (e) {
            console.log(e);
            res.json(error());
        }
    })
    .post("/admin/getComments", async (req, res) => {
        try {
            const keyword = req.body.keyword || "";
            const offset = (req.body.pageNo - 1) * 10;

            const data = await req.models.comment.getComments({ keyword, offset });
            res.json(success(data));
        } catch (e) {
            console.log(e);
            res.json(error());
        }
    })
    .post("/admin/delComment", async (req, res) => {
        try {
            const data = await req.models.comment.delComment(req.body.id);
            const total = data.length;
            res.json({ code: "1000", message: "处理成功", data, total, success: true });
        } catch (e) {
            console.log(e);
            res.json(error());
        }
    });
};

