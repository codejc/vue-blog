import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/login";
import ArticleManage from "@/pages/article";
import ArticleDetail from "@/pages/article_detail";
import Hot from "@/pages/hot";
import Tag from "@/pages/tag";
import Link from "@/pages/link";
import Data from "@/pages/data";
import User from "@/pages/user";
import Comment from "@/pages/comment";

import { GET_USERINFO } from "@/store/types";
Vue.use(Router);

const router = new Router({
    // mode: "history",
    routes: [
        {
            path: "/",
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
        },
        {
            path: "/hot",
            name: "hot",
            component: Hot
        },
        {
            path: "/tag",
            name: "tag",
            component: Tag
        },
        {
            path: "/link",
            name: "link",
            component: Link
        },
        {
            path: "/data",
            name: "data",
            component: Data
        },
        {
            path: "/user",
            name: "user",
            component: User
        },
        {
            path: "/comment",
            name: "comment",
            component: Comment
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
