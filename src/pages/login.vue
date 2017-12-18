<template>
    <div class="jc-login">
        <div class="jc-login-card">
            <el-input v-model="account" placeholder="请输入账号"></el-input>
            <el-input v-model="password" placeholder="请输入密码"></el-input>
        </div>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            account: "",
            password: ""
        };
    }
};
</script>

<style scoped>
</style>
