import query from "../db";
export default {

    // 根据账号获取用户信息
    getUserByLoginId: (loginId) => {
        const sql = `
            select a.*
            from user a
            where a.loginId = '${loginId}'`;
        return query(sql);
    },

    // 根据用户昵称获取用户信息
    getUserByUserName: (userName) => {
        const sql = `
            select a.*
            from user a
            where a.userName = '${userName}'`;

        return query(sql);
    },

    // 添加用户
    addUser: ({ loginId, userName, password }) => {
        const sql = `
            insert into user (loginId, userName, password) 
            value('${loginId}','${userName}','${password}')`;

        return query(sql);
    }
};

