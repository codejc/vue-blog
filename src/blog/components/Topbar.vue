<template>
    <div class="tob-bar">
        <el-menu mode="horizontal" :default-active="$route.path" :router="true">
            <router-link class="brand" to="/" tag="h3">Jc Blog</router-link>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/chat">文章分类</el-menu-item>
            <el-menu-item index="/chat">在线交流</el-menu-item>
            <div class="login" @click="showLogin" v-if="!isLogin">登录</div>
            <el-dropdown trigger="click" v-else>
                <div class="favicon">{{userInfo.userName.slice(0, 1).toUpperCase()}}</div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="input-with-select">
                <el-input placeholder="请输入搜索关键字" v-model="keyword"></el-input>
                <i class="fa fa-search" aria-hidden="true" @click="search"></i>
            </div>
        </el-menu>
        <login-card ref="loginCard"></login-card>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { DO_LOGOUT } from "@/store/types";
import storage from "@/assets/js/cache";
import LoginCard from "./LoginCard";

export default {
    components: {
        LoginCard
    },
    data() {
        return {
            keyword: ""
        };
    },
    computed: mapState({
        userInfo: state => state.user.userInfo,
        isLogin: state => state.user.isLogin
    }),
    methods: {
        search() {
            const me = this;
            me.$router.push({ path: "search", query: { keyword: me.keyword } });
        },
        showLogin() {
            this.$refs.loginCard.open();
        },
        logout() {
            this.$store.commit(DO_LOGOUT);
            storage.removeStorage("token");
        }
    }
};
</script>

<style lang="less">
.tob-bar {
    height: 60px;
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    background-color: #324157;
    z-index: 3;
    .el-menu {
        width: 1140px;
        margin: 0 auto;
        background: #324157;
        color: white;
        z-index: 4;
        .el-menu-item {
            color: #bfcbd9;
            font-weight: 500;
            &:hover {
                background: #324157;
                color: white;
            }
            &:active,
            &:focus {
                background: #324157;
            }
            &:focus {
                color: #bfcbd9;
            }
            &.is-active {
                color: white;
                background: #324157;
                border-bottom: 4px solid #35bc9b;
            }
        }
    }
    .login {
        margin-left: 50px;
        float: right;
        line-height: 60px;
        user-select: none;
        cursor: pointer;
        outline: none;
        font-size: 16px;
        opacity: .8;
        transition: opacity .3s;
        &:hover {
            opacity: 1;
        }
    }
    .brand {
        float: left;
        line-height: 59px;
        padding: 0 50px 0 0;
        user-select: none;
        cursor: pointer;
        outline: none;
    }
    .input-with-select {
        // display: inline-block;
        width: 260px;
        margin-top: 10px;
        float: right;
        // margin-right: 50px;
        outline: none;
        .el-input {
            width: 230px;
        }
        .fa-search {
            color: #888888;
            position: relative;
            left: -30px;
            font-size: 18px;
        }
    }

    .el-dropdown {
        float: right;
    }
    .favicon {
        border-radius: 50%;
        color: white;
        background-color: lightgrey;
        width: 40px;
        height: 40px;
        float: right;
        font-size: 20px;
        font-weight: 600;
        line-height: 40px;
        margin-top: 10px;
        outline: none;
    }
}   
</style>