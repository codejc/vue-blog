<template>
    <div class="jc-login">
        <div class="layout-header">
            <el-input placeholder="请输入关键词" v-model="keyword"></el-input>
            <el-button type="primary" @click="getComments">搜索</el-button>
        </div>
        <div class="layout-main">
            <el-table :data="comments" :height="tableHeight">
                <el-table-column prop="articleTitle" label="文章名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="authorName" label="评论人" show-overflow-tooltip></el-table-column>
                <el-table-column prop="content" label="评论内容" show-overflow-tooltip></el-table-column>
                <el-table-column prop="time" label="评论时间" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="delComment(scope.row.id)"> 删除</el-button>
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
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "commentsManage",
    computed: mapState({
        tableHeight: state => state.layout.tableHeight
    }),
    data() {
        return {
            comments: [],
            pageNo: 1,
            keyword: "",
            tagName: "",
            total: 0
        };
    },
    async created() {
        this.getComments();
    },
    methods: {
        async getComments() {
            const me = this;
            const { success, data, total } = await me.axios.post(me.$api.GET_COMMENTS, { keyword: me.keyword, pageNo: me.pageNo });
            if (!success) return;
            me.comments = data;
            me.total = total;
        },

        async delComment(id) {
            const me = this;
            const isConfirm = await me.showConfirm("是否确认删除该评论");
            if (!isConfirm) return;

            const res = await me.axios.post(me.$api.DELETE_COMMENT, { id });
            if (!res.success) return me.$message.error("删除失败");
            me.$message.success("删除成功");
            me.getComments();
        },

        handleCurrentChange(no) {
            const me = this;
            me.pageNo = no;
            me.getComments();
        },

        handleClose() {
            this.dialogVisible = false;
        }
    }
};
</script>

<style scoped>
</style>
