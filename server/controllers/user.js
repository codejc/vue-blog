const User = require("../models/user");
const { error, success } = require("../util/toJson");

module.exports = (router) => {
    // 注册
    router.post("/register", async (req, res) => {
        // 分页
        const loginId = req.body.loginId;
        const userName = req.body.userName;
        const password = req.body.password;

        try {
            const id = await User.getUserByLoginId(loginId);
            const name = await User.getUserByUserName(userName);
            if (!id.length && !name.length) {
                await User.addUser({ loginId, userName, password });
                res.json(success("注册成功"));
            } else if (name.length) {
                res.json(error("该昵称已存在"));
            } else {
                res.json(error("该账号已存在"));
            }
        } catch (e) {
            res.json(error());
        }
    })
    .post("/login", async (req, res) => {
        const loginId = req.body.loginId;
        const password = req.body.password;
        const data = await User.getUserByLoginId(loginId);
        if (!data.length) {
            res.json(error("该账号不存在"));
        } else if (data[0].password !== password) {
            res.json(error("密码输入不正确"));
        } else {
            res.json(success(data[0], "登录成功"));
        }
    });
};
