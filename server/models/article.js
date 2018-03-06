const db = require("../db");

exports.get = ({ tag, offset, pageSize, keyword }) => {
    console.log(tag);
    let sql = `
        select a.*,count(c.id) as comments
        from article a
        left join comment c on (a.id = c.aid)
        where a.tag like '%${tag || ''}%' and a.title like '%${keyword || ''}%'
        group by a.id
        limit ${offset},${pageSize}`;
    return db.query(sql);
    // console.log(db.query(sql))
};