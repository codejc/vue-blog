
module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
    apps: [

    // First application
        {
            name: "server",
            script: "app.js",
            node_args: ["--harmony", "--inspect"], // 开启node 在chrome下的调试
            watch: ["./controllers", "./models", "./util", "./app.js", "./config.js", "./db", "./middlewares"],
            // 改变pm2执行环境，使用babel-node执行，兼容es6
            exec_interpreter: "babel-node",
            log_date_format: "YYYY-MM-DD",
            env: {
                COMMON_VARIABLE: "true"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
};
