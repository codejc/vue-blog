# vue-blog

> 基于Vue.js、mysql、express的前后端分离的博客系统，包含博客以及后台管理系统及node服务器。

## 技术框架

###前端：
采用vue-cli脚手架，Vue、Vuex，vue-router，axios以及element-ui组件框架。后台管理使用ecahrt进行数据可视化。使用webpack配置前端项目的打包压缩。使用eslint进行代码检查，用husky做git commit 和 git push进行提交代码前的检查。

###后端：
项目采用MVC架构，node.js为基础，express搭建node服务器，数据库使用mysql，socket.io建立双向通信连接。使用pm2进行进程守护。

## 功能
> 博客

* 瀑布流加载
* 博文分类、热文排行
* 评论、点赞
* 在线讨论版块（聊天室）
* 服务端渲染（暂定）

> 管理后台

* 注册、登录
* 博客注册用户管理
* 富文本编辑
* 博文编辑、发布
* 评论管理
* 热门版块管理、博文分类管理
* 可视化数据统计（文章阅读数、网站访问人数等）

## 使用步骤
#### 注：除npm install需要在不同目录下安装，其他script命令都在根目录下执行
``` bash
# 安装前端依赖
npm install

# 安装服务端依赖
cd server && npm install

# 运行博客本地开发环境
npm run dev:front

# 运行后台管理开发环境
npm run dev:admin

# 打包构建博客（生产）
npm run build:front

# 打包构建管理后台（生产）
npm run build:admin

# 运行本地服务器（需安装pm2模块）
npm run server

```

## 自动化部署
待更新

#### Tips: 
1. node版本请升级到8+，避免不兼容es6/7的语文，导致程序报错。
2. node服务器的进程守护采用pm2，项目package.json没有包含，请自行安装该模块（npm install pm2 -g）。
3. 除npm install需要在不同目录下执行，其他script命令都在根目录下执行 
