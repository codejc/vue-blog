// import express from "express";
import fs from "fs";

// const router = express.Router();
const url = __dirname;
import article from "./article";
import user from "./user";
console.log(user);
export default (router) => {
    console.log(router.use(user(router)));
    // fs.readdirSync(url).forEach(file => {
    //     const dirName = file.split(".")[0];
    //     const controller = require(`${url}/${dirName}`);
    //     // app.use(controller(router));
    // });
    // router.use(user(router));
};
