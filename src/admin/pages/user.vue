<template>
    <div class="jc-login">
        <div class="layout-header">
            <el-input placeholder="请输入关键词" v-model="keyword"></el-input>
            <el-button type="primary" @click="getUsers">搜索</el-button>
            <div class="btn-group">
            <el-button type="primary" @click="dialogVisible = true">新增</el-button>
            </div>
        </div>
        <div class="layout-main">
            <el-table :data="user" :height="tableHeight">
                <el-table-column prop="userName" label="用户名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="loginId" label="账号" show-overflow-tooltip></el-table-column>
                <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
                <el-table-column prop="applyTime" label="注册时间" show-overflow-tooltip></el-table-column>
                <el-table-column prop="role" label="角色" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="delUser(scope.row.id)"> 删除</el-button>
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
    name: "userManage",
    computed: mapState({
        tableHeight: state => state.layout.tableHeight
    }),
    data() {
        return {
            user: [],
            pageNo: 1,
            keyword: "",
            tagName: "",
            total: 0,
            dialogVisible: false
        };
    },
    async created() {
        this.getUsers();
    },
    methods: {
        async getUsers() {
            const me = this;
            const { success, data } = await me.axios.post(me.$api.GET_USERS, { keyword: me.keyword });
            if (!success) return;
            me.user = data;
        },

        async delUser(id) {
            const me = this;
            const isConfirm = await me.showConfirm("是否确认删除该用户");
            if (!isConfirm) return;

            const res = await me.axios.post(me.$api.DELETE_USER, { id });
            if (!res.success) return me.$message.error("删除失败");
            me.$message.success("删除成功");
            me.getUsers();
        },

        // async createTag() {
        //     const me = this;
        //     const res = await me.axios.post(me.$api.CREATE_TAG, { value: me.tagName });
        //     if (!res.success) return me.$message.error("添加失败");
        //     me.$message.success("添加成功");
        //     me.handleClose();
        //     me.getUsers();
        // },

        handleClose() {
            this.dialogVisible = false;
        },

        handleCurrentChange(no) {
            const me = this;
            me.pageNo = no;
            me.getArticles();
        }
    }
};
</script>

<style scoped>
</style>
