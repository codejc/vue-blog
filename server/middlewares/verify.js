import jwt from "jsonwebtoken"; // 使用jwt签名
import config from "../config";
import { error } from "../util/toJson";

const verify = (req, res, next) => {
    const token = req.headers["x-token"];
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) return res.json(error("用户未登录", "1008"));
            // 验证后将解析出来的用户信息传递给下一个中间件
            req.decoded = decoded;
            next();
        });
    } else {
        return res.json(error("无效token", "1008"));
    }
};

export default verify;
