<template>
    <div>
        <div class="home-main-wrap">
            <div class="main-left">
                <div class="block">
                    <el-carousel trigger="click" height="250px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <img class="recommend" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=523041288,3888711063&fm=27&gp=0.jpg" alt="">
                    </el-carousel-item>
                    </el-carousel>
                </div>
                <thumb v-for="item in articleList" :article="item" :key="item.id"></thumb>
                <p class="loading" v-if="loadingMore"><i class="el-icon-loading"></i> 加载中...</p>
                <p v-if="isEnd">到底部了</p>
            </div>
            <div class="main-right" ref="right" :style="{ top: rightPaddingTop }">
                <tab-card></tab-card>
                <hot-card></hot-card>
                <link-card></link-card>
            </div>
        </div>
        <back-to-top></back-to-top>
    </div>
</template>

<script>
import TabCard from "@/components/TabCard";
import HotCard from "@/components/HotCard";
import Thumb from "@/components/Thumb";
import LinkCard from "@/components/LinkCard";
import BackToTop from "@/components/BackToTop";

export default {
    name: "Login",
    components: {
        TabCard,
        HotCard,
        LinkCard,
        Thumb,
        BackToTop
    },
    data() {
        return {
            articleList: [],
            scrollEvent: null,
            layout: null,
            rightPaddingTop: 0,
            loadingMore: false,
            pageNo: 1,
            pageSize: 10,
            isEnd: false
        };
    },
    mounted() {
        const me = this;
        me.scrollHandler();
    },
    created() {
        this.getArticleList();
    },
    methods: {
        async getArticleList() {
            const me = this;
            const param = {
                pageNo: me.pageNo,
                pageSize: me.pageSize
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
            if (me.loadingMore || me.isEnd) return;
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
                if (layout.scrollTop >= total + 200) {
                    me.rightPaddingTop = `${layout.scrollTop}px`;
                } else {
                    me.rightPaddingTop = 0;
                }
            });
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

.el-carousel {
    margin-bottom: 15px;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.loading {
    padding: 10px 0;
    background-color: white;
}
.recommend {
    cursor: pointer;
}
</style>
