import query from "../db";

export default {

    // 获取所有文章及相关信息
    getList: ({ tag, offset, pageSize, keyword }) => {
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
    getArticle: (id) => {
        const sql = `
            select a.*,count(c.id) as comments
            from article a
            left join comment c on (a.id = c.aid)
            where a.id = ${id}`;

        return query(sql);
    },

    // 根据id获取点赞数
    getLikeById: (id) => {
        const sql = `
            select a.likes
            from article a
            where a.id = ${id}`;

        return query(sql);
    },

    // 根据id更新点赞数
    updateLikesById: (id, val) => {
        const sql = `
            update article set likes = ${val} where id = ${id}
        `;

        return query(sql);
    },

    // 删除文章
    delArticle: (id) => {
        const sql = `delete from article where id = ${id}`;
        return query(sql);
    },

    // 编辑文章
    updateArticle: ({ id, title, content, tag, author, updateTime }) => {
        const sql = `
            update article 
            set title = '${title}', content = '${content}', tag = '${tag}',
            author = '${author}', updateTime = now()
            where id = ${id}`;
        return query(sql);
    }
};

