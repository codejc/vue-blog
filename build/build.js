"use strict"
require("./check-versions")()

const tar = require("tar");
const ora = require("ora")
const rm = require("rimraf")
const path = require("path")
const chalk = require("chalk")
const webpack = require("webpack")
const config = require("../config")
const webpackConfig = require("./webpack.prod.conf")
const NODE_ENV = process.env.NODE_ENV;
// 项目类型 back：后台，front：前台
const PROJECT_TYPE = process.env.PROJECT_TYPE;
// 跑一个本地服务器，去加载压缩打包后的静态资源
if (!NODE_ENV) {
  console.log(chalk.yellow(">server running for local assets"));
  const opn = require("opn");
  const express = require("express");
  const app = express();
  const port = 3002;

  app.use(express.static(config.build.assetsRoot));
  app.listen(port, (err) => {
      if (err) {
          console.log(err);
          return;
      }

      opn(`http://127.0.0.1:${port}`);
      console.log(chalk.green(`> Listening at http://127.0.0.1:${port}`));
  });
  return;
}


const spinner = ora("building for production...")

// 跑一个本地服务器来运行打包完的静态资源
if (!NODE_ENV) {
  console.log(chalk.yellow("local asset is running...\n"));

  const opn = require("opn");
  const express = require("express");
  const app = express();
  const port = 3002;

  app.use(express.static(config.build.assetsRoot));
  app.listen(port, (err) => {
      if (err) {
          console.log(err);
          return;
      }

      opn(`http://127.0.0.1:${port}`);
      console.log(chalk.green(`> Listening at http://127.0.0.1:${port}`));
  });
  return;
}

spinner.start()
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err

    // 将静态资源打包成压缩包文件
    tar.c({
        cwd: config.build.assetsRoot,
        gzip: true,
        file: `${config.build.assetsRoot}/${PROJECT_TYPE}-production.tgz`
    }, ["index.html", "static"])
    .then(_ => {
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false, // if you are using ts-loader, setting this to true will make tyescript errors show up during build
          chunks: false,
          chunkModules: false
        }) + "\n\n")

        console.log(chalk.green(`✔ webpack build success !`));
        console.log(chalk.green(`✔ ${config.build.assetsSubDirectory}/${PROJECT_TYPE}-production.tgz tar&gzip success !\n\n`));
    });

    if (stats.hasErrors()) {
      console.log(chalk.red("  Build failed with errors.\n"))
      process.exit(1)
    }
  })
})
