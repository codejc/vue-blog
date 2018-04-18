import query from "../db";

export default {

    // 获取所有文章及相关信息
    getList({ tag, offset, pageSize, keyword }) {
        const sql = `
            select a.*,count(c.id) as comments
            from article a
            left join comment c on (a.id = c.aid)
            where a.tag like '%${tag || ""}%' and a.title like '%${keyword || ""}%'
            group by a.id
            limit ${offset},${pageSize}`;

        return query(sql);
    },

    // 根据id获取文章
    getArticle(id) {
        const sql = `
            select a.*,count(c.id) as comments
            from article a
            left join comment c on (a.id = c.aid)
            where a.id = ${id}`;

        return query(sql);
    },

    // 根据id获取点赞数
    getLikeById(id) {
        const sql = `
            select a.likes
            from article a
            where a.id = ${id}`;

        return query(sql);
    },

    // 删除文章
    delArticle(id) {
        const sql = `delete from article where id = ${id}`;
        return query(sql);
    },

    // 编辑文章
    updateArticle({ id, title, content, tag, author, updateTime }) {
        const sql = `
            update article 
            set title = '${title}', content = '${content}', tag = '${tag}',
            author = '${author}', updateTime = now()
            where id = ${id}`;
        return query(sql);
    },

    // 添加文章
    addArticle({ title, content, tag, author, publish }) {
        const sql = `
            insert into article (title, content, author, createTime, updateTime, tag, publish)
            values ('${title}', '${content}', '${author}', now(), now(), '${tag}', '${publish}')`;

        return query(sql);
    },
    // 根据id更新访问数
    updateViewsById(id, val) {
        const sql = `
            update article set views = ${val} where id = ${id}`;

        return query(sql);
    },

    // 更改发布状态
    updateStatus({ id, publish }) {
        const sql = `
            update article 
            set publish = '${publish}'
            where id = ${id}`;
        return query(sql);
    }
};

