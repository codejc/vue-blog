import query from "../db";
export default {
    getUsers() {
        const sql = "select u.* from user u";

        return query(sql);
    },
    // 根据账号获取用户信息
    getUserByLoginId(loginId) {
        const sql = `
            select a.*
            from user a
            where a.loginId = '${loginId}'`;
        return query(sql);
    },

    // 根据用户昵称获取用户信息
    getUserByUserName(userName) {
        const sql = `
            select a.*
            from user a
            where a.userName = '${userName}'`;

        return query(sql);
    },

    // 添加用户
    addUser({ loginId, userName, password, email }) {
        const sql = `
            insert into user (loginId, userName, password, applyTime, email) 
            value('${loginId}','${userName}','${password}', now()), '${email}'`;

        return query(sql);
    },

    delUser(id) {
        const sql = `delete from user where id = ${id}`;
        return query(sql);
    },

    //  获取用户数量
    getUserLength() {
        const sql = "select count(id) as length from user";

        return query(sql);
    }
};

