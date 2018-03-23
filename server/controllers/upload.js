
import express from "express";
import fs from "fs";
import path from "path";
import uuid from "uuid";
import config from "../config";
const router = express.Router();

// 获取tag列表
router.post("/admin/uploadImage", (req, res) => {
    const { imgData, type } = req.body;
    // 过滤data:URL
    const base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    const dataBuffer = new Buffer(base64Data, "base64");
    const uniqueId = `${uuid.v1()}.${type}`;
    const data = {
        url: `${config.host}/${uniqueId}`
    };
    // 如果不存在静态资源文件夹，则生成assets文件夹，部署时会忽略assets文件夹。
    fs.exists(config.assetsPath, (isExists) => {
        if (!isExists) {
            fs.mkdir(config.assetsPath, (err) => {
                if (err) console.err(err);
                console.log("assets folder created!");
            });
        }

        // 为上传的图片资源添加唯一id，暂时存放在assets目录下
        fs.writeFile(path.join(config.assetsPath, uniqueId), dataBuffer, (err) => {
            if (err) {
                res.json({ code: "1001", message: "图片上传失败", success: false });
            } else {
                res.json({ code: "1000", message: "图片上传成功", data, success: true });
            }
        });
    });
});
export default router;
