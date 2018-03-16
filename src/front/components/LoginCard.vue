<template>
    <div class="login-card">
        <el-dialog
            :title="atLogin ? '登录' : '注册'"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :close="handleDialogClose"
            width="320px">
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
import storage from "../assets/js/cache";
import { mapState } from "vuex";
import { SET_USERINFO, LOGIN_SUCCESS, SWITCH_LOGIN_CARD } from "@/store/types";

export default {
    data() {
        return {
            atLogin: true,
            loading: false,
            dialogVisible: false,
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
        open() {
            this.dialogVisible = true;
        },
        close() {
            this.dialogVisible = false;
        },
        async login() {
            const me = this;
            me.loading = true;
            const res = await me.axios.post(me.$api.LOGIN, me.form);
            const { loginId, userName, token } = res.data;
            me.loading = false;
            if (!res.success) return me.$message.error(res.message);
            me.$message.success("登录成功");
            me.close();
            storage.setStorage("token", token);
            me.$store.commit(SET_USERINFO, { loginId, userName });
            me.$store.commit(LOGIN_SUCCESS);
            me.dialogVisible = false;
        },
        async register() {
            const me = this;
            me.loading = true;
            const res = await me.axios.post(me.$api.REGISTER, me.form);
            me.loading = false;
            if (!res.success) return me.$message.error(res.message);
            me.close();
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
    .el-dialog__header {
        text-align: left;
    }
    .btn-login {
        width: 100%;
    }
    .operate-group {
        margin-top: 15px;
    }
}
</style>