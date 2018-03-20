import query from "../db";

export default {
    getTags: (obj) => {
        const sql = "select t.* from tag t";
        return query(sql);
    }
};

