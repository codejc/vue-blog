<template>
    <div class="jc-login">
        <router-view v-if="atDetail" :refresh="getArticles"></router-view>
        <div v-else>
            <div class="layout-header">
                <el-input placeholder="请输入关键词" v-model="keyword"></el-input>
                <el-button type="primary" @click="getArticles">搜索</el-button>
            </div>
            <div class="layout-main">
                <el-table :data="articles" :height="tableHeight">
                    <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="author" label="作者"></el-table-column>
                    <el-table-column prop="tag" label="标签" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="createTime" label="创建日期" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="updateTime" label="最后修改日期" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="views" label="访问数"></el-table-column>
                    <el-table-column prop="comments" label="评论数"></el-table-column>
                    <el-table-column prop="likes" label="点赞数"></el-table-column>
                    <el-table-column label="发布状态">
                        <template slot-scope="scope">
                            <el-switch
                                @change="handleStatusChange(scope.row)"
                                v-model="scope.row.publish"
                                :inactive-value="0"
                                :active-value="1">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button type="text" @click="goDetail(scope.row.id)"> 编辑</el-button>
                            <el-button type="text" @click="delArticle(scope.row.id)"> 删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="layout-footer">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :total="total"
                    @current-change="handleCurrentChange"
                    :current-page.sync="pageNo"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "articleManage",
    computed: mapState({
        tableHeight: state => state.layout.tableHeight,
        atDetail() {
            // 根据url是否含有 detail 字符串判断是否在跳转详情子路由。
            return this.$route && this.$route.path.indexOf("detail") > -1;
        }
    }),
    data() {
        return {
            articles: [],
            pageNo: 1,
            keyword: "",
            total: 0
        };
    },
    async created() {
        this.getArticles();
    },
    methods: {
        async getArticles() {
            const me = this;
            const params = {
                pageNo: me.pageNo,
                keyword: me.keyword
            };
            const res = await me.axios.post(me.$api.GET_ARTICLE_LIST, params);
            if (!res.success) return;
            me.articles = res.data.articles;
            me.total = res.data.total;
        },

        handleCurrentChange(no) {
            const me = this;
            me.pageNo = no;
            me.getArticles();
        },

        async delArticle(id) {
            const me = this;
            const isConfirm = await me.showConfirm("是否确认删除该文章");
            if (!isConfirm) return;

            const res = await me.axios.post(me.$api.DELETE_ARTICLE, { id });
            if (!res.success) return me.$message.error("删除失败");
            me.$message.success("删除成功");
            me.getArticles();
        },

        goDetail(id) {
            this.$router.push({ name: "articleDetail", params: { id } });
        },

        async handleStatusChange(row) {
            const me = this;
            const { id, publish } = row;
            const cnStatus = !publish ? "下架" : "发布";
            const res = await me.axios.post(me.$api.PUBLISH_ARTICLE, { id, publish });
            if (!res.success) return me.$message.error(`${cnStatus}失败`);
            me.$message.success(`${cnStatus}成功`);
        }
    }
};
</script>

<style scoped>
</style>
