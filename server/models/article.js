const db = require("../db");

// 获取所有文章及相关信息
exports.getList = ({ tag, offset, pageSize, keyword }) => {
    const sql = `
        select a.*,count(c.id) as comments
        from article a
        left join comment c on (a.id = c.aid)
        where a.tag like '%${tag || ""}%' and a.title like '%${keyword || ""}%'
        group by a.id
        limit ${offset},${pageSize}`;

    return db.query(sql);
};

// 根据id获取文章
exports.getArticle = (id) => {
    const sql = `
    select a.*,count(c.id) as comments
    from article a
    left join comment c on (a.id = c.aid)
    where a.id = ${id}`;

    return db.query(sql);
};

// 根据id获取点赞数
exports.getLikeById = (id) => {
    const sql = `
        select a.likes
        from article a
        where a.id = ${id}`;

    return db.query(sql);
};

// 根据id点赞
exports.doLikeById = (id, likes) => {
    const sql = `
        update article set likes=${likes}
        where id = ${id}`;

    return db.query(sql);
};

// 根据id获取评论
exports.getCommentsById = (id) => {
    const sql = `
        select c.id, c.content, c.time, c.author, c.reply_author as replyAuthor
        from comment c
        where aid = ${id}`;

    return db.query(sql);
};
