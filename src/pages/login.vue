<template>
    <div class="jc-login">
        <div class="jc-login-card">
            <el-input v-model="account" placeholder="请输入账号"></el-input>
            <el-input v-model="password" placeholder="请输入密码"></el-input>
        </div>
    </div>
</template>

<script>
import api from "@/assets/js/api.js";
export default {
    name: "Login",
    data() {
        return {
            account: "",
            password: ""
        };
    },
    async created() {
        const resp = await this.axios.post(api.GET_ARTICLE_LIST);
        console.log(resp);
    }
};
</script>

<style scoped>
</style>
