<template>
    <div class="login-card">
        <p class="title">Jc Blog Admin</p>
        
        <el-form :model="form">
            <div v-if="atLogin">
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
                    <el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
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
    </div>
</template>

<script>
import storage from "../assets/js/cache";
import { mapState } from "vuex";
import { SET_USERINFO, LOGIN_SUCCESS, SWITCH_LOGIN_CARD } from "@/store/types";

export default {
    data() {
        return {
            atLogin: true,
            loading: false,
            form: {}
        };
    },
    computed: mapState({
        userInfo: state => state.user.userInfo,
        isLogin: state => state.user.isLogin
    }),
    methods: {
        dialogChange() {
            this.atLogin = !this.atLogin;
            this.form = {};
        },
        async login() {
            const me = this;
            me.loading = true;
            const res = await me.axios.post(me.$api.LOGIN, me.form);
            const data = res.data;
            me.loading = false;
            if (!res.success) return me.$message.error(res.message);
            me.$message.success("登录成功");
            storage.setStorage("token", data.token);
            me.$store.commit(SET_USERINFO, { loginId: data.loginId, userName: data.userName });
            me.$store.commit(LOGIN_SUCCESS);
            me.$router.push({ path: "/" });
        },
        async register() {
            const me = this;
            me.loading = true;
            const res = await me.axios.post(me.$api.REGISTER, me.form);
            me.loading = false;
            if (!res.success) return me.$message.error(res.message);
            me.$message.success("注册成功，快尝试登录吧");
            me.handleDialogClose();
        },
        handleDialogClose() {
            const me = this;
            me.atLogin = true;
            me.form = {};
        }
    }
};
</script>

<style lang="less">
.login-card {
    background-color: white;
    width: 300px;
    margin: 140px auto;
    padding: 20px;
    .btn-login {
        width: 100%;
    }
    .operate-group {
        margin-top: 15px;
    }
    .title {
        font-size: 24px;
        padding-bottom: 20px;
    }
}
</style>