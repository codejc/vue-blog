import query from "../db";

export default {
    addComment: (obj) => {
        const sql = `
        insert into comment (aid, author_name, author_id, reply_name, reply_id, content, root, time) 
        value(
            '${obj.articleId}',
            '${obj.userName}',
            '${obj.loginId}',
            '${obj.replyName || ""}',
            '${obj.replyId || 0}',
            '${obj.content || ""}',
            '${obj.root}',
            now())`;
        return query(sql);
    },
    // 根据id获取评论
    getCommentsById: (id) => {
        const sql = `
            select c.id, c.content, c.root, c.time, c.author_id as authorId, c.author_name as authorName, c.reply_name as replyName, c.reply_id as replyId
            from comment c
            where aid = ${id}`;

        return query(sql);
    },
    getCommentsLength: (id) => {
        const sql = `
            select max(id) as length from comment`;

        return query(sql);
    },
    getGropByRoot: (root) => {
        const sql = `
            select c.id, c.content, c.time, c.author_id as authorId, c.author_name as authorName, c.reply_name as replyName, c.reply_id as replyId
            from comment c
            where root = ${root} or c.id = ${root}`;

        return query(sql);
    }
};

