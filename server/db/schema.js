const mongoose = require("mongoose");
// Schema 数据库模型，一种以文件形式存储的数据库模型骨架
var Schema = mongoose.Schema;

// 用户表
const User = Schema({
    id: Number,
    name: String,
    loginId: String,
    password: String,
    email: String,
    comments:  [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    applyTime: String,
    articles: Array,
    role: String
}, {
    collection: "User"
});

// 文章表
const Article = Schema({
    id: Number,
    title: String,
    content: String,
    author: String,
    createTime: String,
    updateTime: String,
    tag: String,
    history: Number,
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
}, {
    collection: "Articles"
});

// 标签分类
const Tag = Schema({
    id: Number,
    type: String,
    articles: Array
}, {
    collection: "Tag"
});

// 评论
const Comment = Schema({
    id: Number,
    aid: { type: Schema.Types.ObjectId, ref: "Acticle" },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    comment: String,
    time: String
}, {
    collection: "Comment"
});

module.exports = {
    User,
    Article,
    Tag,
    Comment
};