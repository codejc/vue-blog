import query from "../db";

export default {
    // 根据id添加访问记录
    AddViewsById({ id, tag, title, duration }) {
        const sql = `insert into view (articleId, time, tag, title, duration) value('${id}', now(), '${tag}', '${title}', '${duration}')`;
        return query(sql);
    },
    getViewsById(id) {
        const sql = `select d.* from view d where articleId = ${id}`;

        return query(sql);
    },
    getViewsByTag(tag) {
        const sql = `select d.* from view d where tag = '${tag}'`;

        return query(sql);
    },
    getViewsByDate(date) {
        const sql = `select d.* from view d where d.time like '%${date}%'`;

        return query(sql);
    }
};

