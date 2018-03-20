import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/modules/user";
import layout from "@/store/modules/layout";
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        layout
    }
});

export default store;
