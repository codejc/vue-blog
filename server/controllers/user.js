import User from "../models/user";
import { error, success } from "../util/toJson";
import exp from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import verify from "../middlewares/verify";

const app = exp();

const router = exp.Router();

// 注册
router.post("/register", async (req, res) => {
    // 分页
    const { loginId, userName, password } = req.body;

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
// 登录
.post("/login", async (req, res) => {
    const { loginId, password } = req.body;

    try {
        const data = await User.getUserByLoginId(loginId);
        if (!data.length) {
            res.json(error("该账号不存在"));
        } else if (data[0].password !== password) {
            res.json(error("密码输入不正确"));
        } else {
            const token = jwt.sign({ ...data[0] }, config.jwtSecret, {
                expiresIn: 60 * 60 * 24 // 授权时效24小时
            });

            res.json(success({
                loginId: data[0].loginId,
                userName: data[0].userName,
                token
            }, "登录成功"));
        }
    } catch (e) {
        res.json(error());
    }
})
// 获取用户信息
.post("/getUserInfo", verify, async (req, res) => {
    try {
        const { loginId, userName } = req.decoded;

        res.json(success({ loginId, userName }));
    } catch (e) {
        console.log(e);
        res.json(error());
    }
});

export default router;

