import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/login.vue";
import Home from "@/pages/home.vue";
import Search from "@/pages/search.vue";
import Chat from "@/pages/chat.vue";
import Article from "@/pages/article.vue";
import { GET_USERINFO } from "@/store/types";
Vue.use(Router);

const router = new Router({
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
            component: Search
        },
        {
            path: "/chat",
            name: "chat",
            component: Chat
        },
        {
            path: "/article",
            name: "article",
            component: Article
        }
    ]
});

export default router;
