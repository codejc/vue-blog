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
    SET_USERINFO,
    SET_MENU_PERMISSION
} from "@/store/types";

const loginModule = {
    state: {
        isLogin: false,
        userInfo: {},
        permission: {}
    },
    mutations: {
        [LOGIN_SUCCESS](state) {
            state.isLogin = true;
        },
        [LOGIN_FAILURE](state) {
            state.isLogin = false;
            state.userInfo = {};
            state.permission = {};
        },
        [SET_USERINFO](state, account) {
            state.userInfo = account;
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
            let respData;
            const userPermission = {};

            try {
                if (!state.isLogin) {
                    const resp = await Axios.post(api.USERINFO, { dropMessage: true }, { dropLoading: true });

                    respData = resp.data;

                    if (!respData) return state.userInfo;

                    commit(SET_USERINFO, {
                        loginId: respData.loginId,
                        userName: respData.userName,
                        email: respData.email,
                        phone: respData.phone
                    });

                    if (state.userInfo.loginId) commit(LOGIN_SUCCESS);

                    respData.permissionList.forEach((item, index) => {
                        if (!userPermission[item.menuCode]) {
                            userPermission[item.menuCode] = { ...item };
                            userPermission[item.menuCode].permission = [];
                        }

                        userPermission[item.menuCode].permission.push(item.permission);
                    });

                    state.permission = userPermission;

                    commit(SET_MENU_PERMISSION, userPermission);
                }
            } catch (e) {
                // console.log(e);
            }

            return state.userInfo;
        }
    }
};

export default loginModule;
