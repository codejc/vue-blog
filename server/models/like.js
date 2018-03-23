import query from "../db";

export default {
    // 根据id更新点赞数
    AddLikeById: (id) => {
        const sql = `insert into likes (article_id, time) value('${id}', now())`;
        return query(sql);
    },
    getLikesById: (id) => {
        const sql = `select d.* from likes d where article_id = ${id}`;

        return query(sql);
    },
    getLikesByDate: (date) => {
        const sql = `select d.* from likes d where d.time like '%${date}%'`;

        return query(sql);
    }
};

