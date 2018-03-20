<template>
    <div class="scroll-view">
        <slot></slot>
        <p class="loading" v-if="loadingMore"><i class="el-icon-loading"></i> 加载中...</p>
        <!-- <p v-if="isEnd && !">到底部了</p> -->
        <div class="back-to-top" @click="goTop">
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </div>
    </div>
</template>

<script>

export default {
    name: "scrollView",
    data() {
        return {
            loadingMore: false,
            isEnd: false
        };
    },
    mounted() {
        const me = this;
        me.scrollHandler();
    },
    methods: {
        // 页面滚动监听，主要针对右侧面板滚动，以及瀑布流加载
        scrollHandler() {
            const me = this;
            // 计算右侧面板所有子元素的高度
            const layout = document.body.querySelector("#app");
            layout.addEventListener("scroll", () => {
                try {
                    const scrollTop = layout.scrollHeight - layout.clientHeight;

                    if (layout.scrollTop >= scrollTop && !me.isEnd) {
                        me.loadMore();
                    }
                } catch (e) {
                    // console.log(e);
                }
            });
        },
        loadMore() {
            const me = this;
            me.loadingMore = true;
            setTimeout(() => {
                me.$emit("handleLoadMore");
                me.loadingMore = false;
            }, 500);
        },
        goTop() {
            const layout = document.body.querySelector("#app");
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

    .loading {
        text-align: center;
        width: 100%;
    }

    .back-to-top {
        width: 40px;
        height: 40px;
        background-color: @global-color-primary;
        position: fixed;
        bottom: 50px;
        cursor: pointer;
        right: 50px;
        color: white;
        font-size: 20px;
        line-height: 40px;
        z-index: 99;
        &:hover {
            opacity: .8;
        }
    }
</style>
