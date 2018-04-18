import query from "../db";

export default {
    addComment(obj) {
        const sql = `
        insert into comment (aid, author_name, author_id, reply_name, reply_id, content, root, time, article_title) 
        value(
            '${obj.articleId}',
            '${obj.userName}',
            '${obj.loginId}',
            '${obj.replyName || ""}',
            '${obj.replyId || 0}',
            '${obj.content || ""}',
            '${obj.root}',
            now(),
            '${obj.articleName}')`;
        return query(sql);
    },

    delComment(id) {
        const sql = `delete from comment where id = ${id}`;
        return query(sql);
    },

    // 关键词获取评论
    getComments({ keyword, offset }) {
        const sql = `
            select d.article_title as articleTitle, d.id, d.author_name as authorName, d.content, d.time
            from comment d 
            where author_name like '%${keyword}%' or article_title like '%${keyword}%' or content like '%${keyword}%'
            limit ${offset},10`;
        return query(sql);
    },

    // 根据id获取评论
    getCommentsById(id) {
        const sql = `
            select c.id, c.content, c.root, c.time, c.author_id as authorId, c.author_name as authorName, c.reply_name as replyName, c.reply_id as replyId
            from comment c
            where aid = ${id}`;

        return query(sql);
    },

    getCommentsByDate(date) {
        const sql = `
            select d.* from comment d
            where d.time like '%${date}%'`;
        return query(sql);
    },

    getCommentsLength(id) {
        const sql = `
            select max(id) as length
            from comment`;

        return query(sql);
    },

    getGropByRoot(root) {
        const sql = `
            select c.id, c.content, c.time, c.author_id as authorId, c.author_name as authorName, c.reply_name as replyName, c.reply_id as replyId
            from comment c
            where root = ${root} or c.id = ${root}`;

        return query(sql);
    }
};

