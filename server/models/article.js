const Article = require("../db").Article;

exports.get = ({ pageNo, pageSize, tag }, cb) => {
    let result;
    if (tag) {
        result = Article.find({ tag: tag });
    } else {
        result = Article.find();
    }
    result.skip(pageNo).limit(pageSize).exec((error, data) => {
        if (error) {
            cb(error);
        } else {
            cb(null, data);
        }
    });
};