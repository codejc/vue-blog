import express from "express";
import fs from "fs";

const router = express.Router();
const url = __dirname;
const dir = fs.readdirSync(url);

// 循环遍历导入router，避免每次都要添加
dir.forEach(item => {
    const name = item.split(".")[0];
    const module = require(`${url}/${name}`);
    Object.keys(module).forEach(method => {
        Object.keys(module[method]).forEach(fn => {
            router[method](fn, module[method][fn]);
        });
    });
    // router.use(module);
    // console.log(module);
});
console.log(router);
export default router;

