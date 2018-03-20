<template>
    <scroll-view @handleLoadMore="loadMore" ref="scrollView">
        <div class="home-main-wrap">
            <div class="block" v-if="pageName === 'home'">
                <el-carousel trigger="click" height="250px">
                <el-carousel-item v-for="item in 4" :key="item">
                    <img class="recommend" style="width: 100%" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=523041288,3888711063&fm=27&gp=0.jpg" alt="">
                </el-carousel-item>
                </el-carousel>
            </div>
            <p class="top-tip" v-if="!articleList.length">暂无内容</p>
            <thumb v-for="item in articleList" :article="item" :key="item.id"></thumb>
        </div>
    </scroll-view>
</template>

<script>
import Thumb from "@/components/Thumb";
import ScrollView from "@/components/ScrollView";

export default {
    name: "home",
    components: {
        Thumb,
        ScrollView
    },
    data() {
        return {
            articleList: [],
            pageNo: 1,
            pageSize: 10,
            tag: this.$route.query.tag,
            keyword: "",
            pageName: this.$route.name
        };
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
            if (!resp.data.length || resp.data.length < me.pageSize) me.$refs.scrollView.isEnd = true;
            resp.data.forEach(item => me.articleList.push(item));
        },
        loadMore() {
            this.pageNo++;
            this.getArticleList();
        }
    }
};
</script>

<style lang="less" scoped>

.top-tip {
    background-color: white;
    padding: 10px 20px;
    text-align: left;
    color: gray;
    border-bottom: 1px solid lightgray;
}
</style>
