<template>
    <div>
        <div class="page-login">
            <LoginCard></LoginCard>
        </div>
    </div>
</template>

<script>
import LoginCard from "@/components/LoginCard";

export default {
    name: "login",
    components: {
        LoginCard
    }
};
</script>

<style lang="less" scoped>
.page-login {
    background-color: white;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image:url("https://static.zhihu.com/heifetz/sign_bg.db29b0fbd2f78dd8c1b7.png");
}
</style>
