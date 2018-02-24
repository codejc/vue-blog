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
require("../util/datamaker")(model.Article, 16);
// 暴露出数据库模型
module.exports = model;
