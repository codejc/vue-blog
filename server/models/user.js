const db = require("../db");

exports.getUserByLoginId = (loginId) => {
    const sql = `
        select a.*
        from user a
        where a.loginId = '${loginId}'`;
    return db.query(sql);
};

exports.getUserByUserName = (userName) => {
    const sql = `
        select a.*
        from user a
        where a.userName = '${userName}'`;

    return db.query(sql);
};

exports.addUser = ({ loginId, userName, password }) => {
    const sql = `
    insert into user (loginId, userName, password) 
    value('${loginId}','${userName}','${password}')`;

    return db.query(sql);
};
