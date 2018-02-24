<template>
    <div>
        <div class="main-left">
            <slot></slot>
            <p class="loading" v-if="loadingMore"><i class="el-icon-loading"></i> 加载中...</p>
            <!-- <p v-if="isEnd">到底部了</p> -->
        </div>
        <back-to-top></back-to-top>
    </div>
</template>

<script>
import LinkCard from "@/components/LinkCard";
import BackToTop from "@/components/BackToTop";

export default {
    name: "scrollView",
    components: {
        LinkCard,
        BackToTop
    },
    data() {
        return {
            scrollEvent: null,
            layout: null,
            loadingMore: false,
            isEnd: false
        };
    },
    mounted() {
        const me = this;
        me.scrollHandler();
    },
    methods: {
        async getArticleList() {
            const me = this;
            const param = {
                pageNo: me.pageNo,
                pageSize: me.pageSize,
                tag: me.tag
            };
            const resp = await me.axios.post(me.$api.GET_ARTICLE_LIST, param);

            const load = () => {
                if (!resp.data.length) me.isEnd = true;
                resp.data.forEach(item => {
                    me.articleList.push(item);
                });
                me.pageNo += 1;
                me.loadingMore = false;
            };

            if (me.loadingMore) {
                // 防止加载过快，至少0.5s，起到过渡效果
                setTimeout(load, 500);
            } else {
                load();
            }
        },
        loadMore() {
            // 加载更多
            const me = this;
            if (me.loadingMore || me.isEnd || me.articleList.length < 10) return;
            me.loadingMore = true;
            me.getArticleList();
        },
        // 页面滚动监听，主要针对右侧面板滚动，以及瀑布流加载
        scrollHandler() {
            const me = this;
            const children = me.$refs.right.children;
            let total = 0;
            // 计算右侧面板所有子元素的高度
            Array.prototype.map.call(children, item => total += item.clientHeight);
            me.layout = document.body.querySelector(".layout-main");
            me.layout.addEventListener("scroll", () => {
                const layout = document.body.querySelector(".layout-main");
                const scrollHeight = layout.scrollHeight;
                const clientHeight = layout.clientHeight;
                const scrollTop = scrollHeight - clientHeight;
                if (layout.scrollTop >= scrollTop) {
                    me.loadMore();
                }
                me.rightPaddingTop = `${layout.scrollTop}px`;
            });
        }
    },
    watch: {
        "$route": function () {
            this.tag = this.$route.query.tag;
            this.pageNo = 1;
            this.articleList = [];
            this.getArticleList();
        }
    }
};
</script>

<style lang="less" scoped>
.home-main-wrap {
    width: 975px;
    // padding: 20px;
    margin: 0 auto;
    // display: flex;
    // justify-content: space-around;
}

.main-left {
    width: 600px;
    float: left;
    text-align: center;
    margin-right: 15px;
}

.main-right {
    float: left;
    width: 320px;
    position: relative;
}

.top-tip {
    background-color: white;
    padding: 10px 20px;
    text-align: left;
    color: gray;
    border-bottom: 1px solid lightgray;
}
</style>
