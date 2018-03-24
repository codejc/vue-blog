
import path from "path";

const host = {
    development: "localhost",
    production: "193.112.27.192"
};

console.log(process.env.NODE_ENV);
export default {
    // 服务器配置
    db: {
        host: "193.112.27.192",
        user: "root",
        password: "123456",
        database: "vue-blog"
    },
    // jwt secrect
    jwtSecret: "www.codejc.com",
    apiVersion: "api/v1",
    assetsPath: path.join(__dirname, "assets"),
    host: "http://193.112.27.192:8888"
};
