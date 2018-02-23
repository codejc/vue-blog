const mongoose = require("mongoose");
const schema = require("./schema");
// 设置连接数据库地址
mongoose.connect("mongodb://localhost:27017/graduation");
// 连接数据库
var db = mongoose.connection;
// 连接数据库的两种状态
// 失败
db.on("error", function () {
    console.log(` ------------------------- ` .red);
    console.log(`| database connect failed |` .red);
    console.log(` ------------------------- ` .red);
});
// 成功
db.once("open", function () {
    console.log(` ------------------------- ` .green);
    console.log(`| database connect success |` .green);
    console.log(` ------------------------- ` .green);
});

const model = {
    // 根据创建的用户数据库模型创建用户模型(构造函数)
    User: mongoose.model("User", schema.User),
    Article: mongoose.model("Article", schema.Article),
    Comment: mongoose.model("Comment", schema.Comment),
    Tag: mongoose.model("Tag", schema.Tag)
};

const u = {
    title: "测试文章2",
    content: "Web前端技术由html、css和javascript三大部分构成，是一个庞大而复杂的技术体系，其复杂程度不低于任何一门后端语言。而我们在学习它的时候往往是先从某一个点切入，然后不断地接触和学习新的知识点，因此对于初学者很难理清楚整个体系的脉络结构。本文将对Web前端知识体系进行...",
    author: "Jc",
    createTime: "2017-5-12",
    updateTime: "2018-1-12",
    tag: "Vue",
    history: "523",
    comments: []
}
const tag = [
    "Javascript",
    "HTML5",
    "CSS",
    "node.js",
    "Nginx",
    "IE",
    "webpack",
    "Vue",
    "ES6",
    "npm"
];
// for (let i = 0; i<15; i++ ) {
//     let index = Math.floor(Math.random() * 10);
//     console.log(index);
//     u.tag = tag[index];
//     new model.Article(u).save();
// }
module.exports = model;