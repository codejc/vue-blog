<template>
    <div class="tob-bar">
        <el-menu mode="horizontal" :default-active="$route.path" :router="true">
            <router-link class="brand" to="/" tag="h3">Jc Blog</router-link>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/chat">文章分类</el-menu-item>
            <el-menu-item index="/chat">在线交流</el-menu-item>
            <div class="login" @click="doLogin">登录</div>
            <div class="input-with-select">
                <el-input placeholder="请输入搜索关键字" v-model="keyword"></el-input>
                <i class="fa fa-search" aria-hidden="true" @click="search"></i>
            </div>
        </el-menu>
        <el-dialog
            :title="isLogin ? '登录' : '注册'"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :close="handleDialogClose"
            width="320px">
            <el-form :model="form">
                <div v-if="isLogin">
                    <el-form-item>
                        <el-input placeholder="请输入账号" v-model="form.loginId"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入密码" type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-button class="btn-login" type="primary" :loading="loading" @click="login">登录</el-button>
                    <el-row class="operate-group" type="flex" justify="space-between">
                        <div>没有账号？ <el-button type="text" @click="dialogChange">注册</el-button></div>
                        <el-button type="text">忘记密码</el-button>
                    </el-row>
                </div>
                <div v-else>
                    <el-form-item>
                        <el-input placeholder="请输入昵称" v-model="form.userName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入账号" v-model="form.loginId"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入密码" type="password" v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请确认密码" type="password" v-model="form.pwdConfirm"></el-input>
                    </el-form-item>
                    <el-button class="btn-login" type="primary" :loading="loading" @click="register">注册</el-button>
                    <el-row class="operate-group" type="flex" justify="center">
                        <div>
                            <el-button type="text" @click="dialogChange">已有账号登录</el-button>
                        </div>
                    </el-row>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {},
            keyword: "",
            dialogVisible: false,
            isLogin: true,
            loading: false
        };
    },
    methods: {
        search() {
            const me = this;
            me.$router.push({ path: "search", query: { keyword: me.keyword } });
        },
        doLogin() {
            this.dialogVisible = true;
        },
        dialogChange() {
            this.isLogin = !this.isLogin;
            this.form = {};
        },
        async login() {
            const me = this;
            me.loading = true;
            const res = await me.axios.post(me.$api.LOGIN, me.form);
            me.loading = false;
            if (!res.success) return me.$message.error(res.responseMessage);
            me.$message.success("登录成功");
            me.dialogVisible = false;
        },
        async register() {
            const me = this;
            me.loading = true;
            const res = await me.axios.post(me.$api.REGISTER, me.form);
            me.loading = false;
            if (!res.success) return me.$message.error(res.responseMessage);
            me.$message.success("注册成功，快尝试登录吧");
            me.handleDialogClose();
        },
        handleDialogClose() {
            const me = this;
            me.isLogin = true;
            me.form = {};
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
    .el-dialog__header {
        text-align: left;
    }
    .btn-login {
        width: 100%;
    }
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
    .operate-group {
        margin-top: 15px;
    }
}
</style>