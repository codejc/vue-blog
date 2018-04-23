import fs from "fs";

const url = __dirname;
const dir = fs.readdirSync(url);
const models = {};

dir.forEach(item => {
    const name = item.split(".")[0];
    if (name !== "index") {
        const module = require(`${url}/${name}`).default;
        models[name] = module;
    }
});

export default models;
