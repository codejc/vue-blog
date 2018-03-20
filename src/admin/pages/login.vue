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
    background-image:url(https://static.zhihu.com/heifetz/bg.8ca8122d44fc9a0f7b04.png);
}
</style>
