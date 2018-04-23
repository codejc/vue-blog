import fs from "fs";
const url = __dirname;

export default (router) => {
    // 遍历controller目录下所有文件
    fs.readdirSync(url).forEach(file => {
        const dirName = file.split(".")[0];
        // 将本文件除外
        if (dirName === "index") return;
        const controller = require(`${url}/${dirName}`).default;
        // 传递router实例
        controller(router);
    });
    return router;
};
