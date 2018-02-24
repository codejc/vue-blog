// 造文章数据

const mock = require("./mock");
const dateFmt = require("./dateFmt");
const Article = require("../db").Article;
const createTitle = () => {
    let title = "";
    for (let i = 0; i < 10; i++) {
        title += (Math.round(Math.random() * 10));
    }
    return title;
}

module.exports = function(model, num) {
    for (let i = 0; i < num; i++ ) {
        let index = Math.floor(Math.random() * 10);
        mock.content.updateTime = dateFmt(Date.now() + (i * 200000) , "yyyy-MM-dd hh:mm");
        // 随机生成tag标签
        mock.content.tag = mock.tag[index];
        mock.content.title = createTitle();
        model(mock.content).save();
    }
}
