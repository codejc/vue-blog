/* eslint no-param-reassign: 0 */
import Axios from "axios";
import api from "@/assets/js/api";
import util from "@/assets/js/util";
import region from "./region";
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    DO_LOGIN,
    DO_LOGOUT,
    GET_USERINFO,
    SET_USERINFO
} from "@/store/types";

const loginModule = {
    state: {
        isLogin: false,
        userInfo: {}
    },
    mutations: {
        [LOGIN_SUCCESS](state) {
            state.isLogin = true;
        },
        [LOGIN_FAILURE](state) {
            state.isLogin = false;
            state.userInfo = {};
        },
        [SET_USERINFO](state, user) {
            state.userInfo = user;
        }
    },
    actions: {
        async [DO_LOGIN]({ dispatch, commit, state }, param) {
            const resp = await Axios.post(api.LOGIN, param, { msg: "努力登录中..." });

            if (resp.success) {
                // commit(LOGIN_SUCCESS);
                dispatch(GET_USERINFO);
                return resp.data;
            }

            return resp;
        },
        async [DO_LOGOUT]({ commit }, param) {
            const resp = await Axios.post(api.LOGOUT, {}, {
                withCredentials: true
            });
            // 退出清空用户所属区域
            region.state.userRegionList = [];
            region.state.regionList = [];
            commit(LOGIN_FAILURE);
            commit(SET_USERINFO, {});
            return resp;
        },
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
