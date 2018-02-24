import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/login.vue";
import Home from "@/pages/home.vue";
import Chat from "@/pages/chat.vue";
Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/search",
            name: "search",
            component: Home
        },
        {
            path: "/chat",
            name: "chat",
            component: Chat
        }
    ]
});
