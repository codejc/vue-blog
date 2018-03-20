/* eslint no-param-reassign: 0 */
import Axios from "axios";
import api from "@/assets/js/api";
import util from "@/assets/js/util";
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    DO_LOGIN,
    DO_LOGOUT,
    GET_USERINFO,
    SET_USERINFO,
    SWITCH_LOGIN_CARD
} from "@/store/types";

const loginModule = {
    state: {
        isLogin: false,
        showLoginCard: false,
        userInfo: {}
    },
    mutations: {
        [LOGIN_SUCCESS](state) {
            state.isLogin = true;
        },
        [LOGIN_FAILURE](state) {
            state.userInfo = {};
        },
        [DO_LOGOUT](state) {
            state.userInfo = {};
            state.isLogin = false;
        },
        [SWITCH_LOGIN_CARD](state) {
            state.showLoginCard = !state.showLoginCard;
        },
        [SET_USERINFO](state, user) {
            state.userInfo = user;
        }
    },
    actions: {
        async [GET_USERINFO]({ commit, state }) {
            try {
                if (!state.isLogin) {
                    const resp = await Axios.post(api.GET_USERINFO);

                    const { loginId, userName } = resp.data;

                    if (!resp.data) return state.userInfo;

                    commit(SET_USERINFO, { loginId, userName });
                    // 如果获取到的用户信息不为空，置登录状态为真
                    if (loginId) commit(LOGIN_SUCCESS);
                }
            } catch (e) {
                // console.log(e);
            }

            return state.userInfo;
        }
    }
};

export default loginModule;
