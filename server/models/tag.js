import query from "../db";

export default {
    getTags: (keyword) => {
        const sql = `select t.* from tag t where value like '%${keyword || ""}%'`;
        return query(sql);
    },
    addTag: (value) => {
        const sql = `insert into tag (value, label)
        values('${value}', '${value}')`;
        return query(sql);
    },
    delTag: (id) => {
        const sql = `delete from tag where id=${id}`;
        return query(sql);
    }
};

