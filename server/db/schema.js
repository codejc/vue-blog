const mongoose = require("mongoose");
// Schema 数据库模型，一种以文件形式存储的数据库模型骨架
const Schema = mongoose.Schema;

// 创建用户数据库模型，第一个参数是模型(表)的内容,第二个参数是模型(表)名字
const userSchema = Schema({
    account: String,
    password: Number
}, {
    collection: "Users"
});

// 创建评论模型
const commentSchema = Schema({
    aid: String,
    comments: Array
}, {
    collection: "Comments"
});
// 创建文章模型
const articleSchema = Schema({
    aid: String,
    title: String,
    content: String,
    account: String,
    date: String
}, {
    collection: "Articles"
});
// 根据创建的用户数据库模型创建用户模型(构造函数)
// User 由 schema 生成的模型，具有抽象属性和行为的数据库操作对

const Models = {
    User: mongoose.model("User", userSchema),
    // Comment: mongoose.model("Comment", commentSchema),
    Article: mongoose.model("Article", articleSchema)
};

module.exports = Models;
