
import path from "path";
export default {
    // 服务器配置
    db: {
        host: "localhost",
        user: "root",
        password: "123456",
        database: "vue-blog"
    },
    // jwt secrect
    jwtSecret: "www.codejc.com",
    apiVersion: "api/v1",
    assetsPath: path.join(__dirname, "assets"),
    host: "193.112.27.192:8888"
};
