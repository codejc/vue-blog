import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/login.vue";
import ArticleManage from "@/pages/article.vue";
import ArticleDetail from "@/pages/article_detail.vue";
import { GET_USERINFO } from "@/store/types";
Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "article",
            redirect: "/article"
        },
        {
            path: "/article",
            name: "article",
            component: ArticleManage,
            children: [{
                path: "detail/:id",
                name: "articleDetail",
                component: ArticleDetail
            }]
        },
        {
            path: "/login",
            name: "login",
            component: Login
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    const store = router.app.$options.store;
    const userInfo = await store.dispatch(GET_USERINFO);

    if (userInfo.loginId) {
        if (to.name === "login" || !to.matched.length) {
            next({ path: "/" });
        } else {
            next();
        }
    } else {
        if (to.name === "login" || to.name === "forget") {
            next();
        } else {
            next({ name: "login" });
        }
    }
});

export default router;
