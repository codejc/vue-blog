<template>
    <div class="back-to-top" @click="goTop">
        <i class="fa fa-arrow-up" aria-hidden="true"></i>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        goTop() {
            const layout = document.body.querySelector(".layout-main");
            const timer = () => {
                layout.scrollTop -= 100;
                if (layout.scrollTop > 0) {
                    requestAnimationFrame(timer);
                }
            };
            timer();
        }
    }
};
</script>

<style lang="less" scoped>
    @import "../assets/css/variable.less";
    .back-to-top {
        width: 40px;
        height: 40px;
        background-color: @global-color-primary;
        position: fixed;
        bottom: 50px;
        right: 50px;
        color: white;
        font-size: 20px;
        line-height: 40px;
    }
</style>