<template>
    <scroll-view @handleLoadMore="loadMore" ref="scrollView">
        <div class="home-main-wrap">
            <h3 class="top-tip" v-if="tag">标签：{{tag}}</h3>
            <h3 class="top-tip" v-if="keyword">关键词：{{keyword}}</h3>
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
            keyword: this.$route.query.keyword
        };
    },
    created() {
        this.getArticleList();
    },
    watch: {
        "$route": function () {
            this.articleList = [];
            this.pageNo = 1;
            this.tag = this.$route.query.tag;
            this.keyword = this.$route.query.keyword;
            this.$refs.scrollView.isEnd = false;
            this.getArticleList();
        }
    },
    methods: {
        async getArticleList() {
            const me = this;
            const param = {
                pageNo: me.pageNo,
                pageSize: me.pageSize,
                tag: me.tag,
                keyword: me.keyword
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
