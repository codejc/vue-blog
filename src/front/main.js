// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint no-param-reassign:0 */
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "@/assets/css/style.less";
import "@/theme/index.css";
import Axios from "axios";
import VueAxios from "vue-axios";
import Api from "@/assets/js/api.js";
import storage from "@/assets/js/cache";

Vue.use(VueAxios, Axios);
Vue.config.productionTip = false;

Vue.use(ElementUI);

// Filter
Vue.filter("dateFormat", (value, format = "yyyy-MM-dd hh:mm:ss") => {
    if (!value) return;
    const date = new Date(value);
    const o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    };

    let fmt = format;
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));

    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    });

    return fmt;
});

Axios.interceptors.request.use((config) => {
    console.log(config);
    config.headers["X-token"] = storage.getStorage("token");
    return config;
}, (error) => {
    return Promise.reject(error);
});

Axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    return Promise.reject(error);
});

// 全局挂载Api
Vue.prototype.$api = Api;
/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    template: "<App/>",
    components: { App }
});
