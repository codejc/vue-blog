
import path from "path";

const host = {
    development: "localhost",
    production: "193.112.27.192"
};

export default {
    // 服务器配置
    db: {
        // host: "193.112.27.192",
        host: "localhost",
        user: "root",
        // password: "123456",
        password: "hjincong",
        database: "vue-blog"
    },
    // jwt secrect
    jwtSecret: "www.codejc.com",
    apiVersion: "api/v1",
    assetsPath: path.join(__dirname, "assets"),
    host: "http://localhost:8888"
};
