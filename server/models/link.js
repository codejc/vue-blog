import query from "../db";

export default {
    getLinks: (keyword) => {
        const sql = `select t.* from link t where label like '%${keyword || ""}%'`;
        return query(sql);
    },
    addLink: ({ label, url }) => {
        const sql = `insert into link (label, url)
        values('${label}', '${url}')`;
        return query(sql);
    },
    delLink: (id) => {
        const sql = `delete from link where id=${id}`;
        return query(sql);
    },
    updateLink: ({ id, url, label }) => {
        const sql = `
            update link
            set url = '${url}', label = '${label}'
            where id=${id}`;
        return query(sql);
    }
};

