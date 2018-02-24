const Article = require("../db").Article;

exports.get = (pageNo, pageSize, cb) => {
    Article.find().skip(pageNo).limit(pageSize).exec((error, data) => {
        if (error) {
            cb(error);
        } else {
            cb(null, data);
        }
    });
};