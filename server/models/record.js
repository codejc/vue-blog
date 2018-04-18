import query from "../db";

export default {
    addRecord({ userName, loginId, duration }) {
        const sql = `
            insert into record (userName, loginId, time, duration) 
            values ('${userName}', '${loginId}', now(), ${duration})`;
        return query(sql);
    },

    getRecordByDate(date) {
        const sql = `
            select d.* from record d
            where d.time like '%${date}%'`;
        return query(sql);
    },

    getTotal(date) {
        const sql = `
            select count(id) as total
            from record`;

        return query(sql);
    }
};

