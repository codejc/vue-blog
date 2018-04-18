import fs from "fs";

const url = __dirname;
const dir = fs.readdirSync(url);
const models = {};
// 循环遍历导入router，避免每次都要添加
dir.forEach(item => {
    const name = item.split(".")[0];
    if (name !== "index") {
        const module = require(`${url}/${name}`).default;
        models[name] = module;
    }
});

export default models;
