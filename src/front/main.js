// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint no-param-reassign:0 */
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/style.less";
import Axios from "axios";
import VueAxios from "vue-axios";
import Api from "@/assets/js/api.js";
Vue.use(VueAxios, Axios);
Vue.config.productionTip = false;

Vue.use(ElementUI);

Axios.interceptors.request.use((config) => {
    // if (typeof config.data === "string") {
    //     config.url += `?${config.data}`;
    //     config.data = {};
    // }
    // // config.data = config.data.toObject();
    // console.log(typeof config.data, config.data);
    // // config.withCredentials = true;
    // config.headers["X-Requested-With"] = +new Date();
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
