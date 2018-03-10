import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";
import article from "@/store/modules/article";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        article
    }
});

export default store;
