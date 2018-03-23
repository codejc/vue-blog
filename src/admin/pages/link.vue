<template>
    <div class="jc-login">
        <div class="layout-header">
            <el-input placeholder="请输入关键词" v-model="keyword"></el-input>
            <el-button type="primary" @click="getLinks">搜索</el-button>
            <div class="btn-group">
            <el-button type="primary" @click="addDialogVisible = true">新增</el-button>
            </div>
        </div>
        <div class="layout-main">
            <el-table :data="links" :height="tableHeight">
                <el-table-column prop="label" label="名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="url" label="地址" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showEditDialog(scope.row)"> 编辑</el-button>
                        <el-button type="text" @click="delLink(scope.row.id)"> 删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="新增"
            :visible.sync="addDialogVisible"
            :modal-append-to-body="false"
            :close="handleClose"
            label-width="100px"
            width="320px">
            <el-input v-model="label" placeholder="请输入链接名称"></el-input>
            <el-input v-model="url" placeholder="请输入链接地址"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createLink">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog
            title="编辑"
            :visible.sync="editDialogVisible"
            :modal-append-to-body="false"
            :close="handleClose"
            label-width="100px"
            width="320px">
            <el-input v-model="label" placeholder="请输入链接名称"></el-input>
            <el-input v-model="url" placeholder="请输入链接地址"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateLink">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "linksManage",
    computed: mapState({
        tableHeight: state => state.layout.tableHeight
    }),
    data() {
        return {
            links: [],
            keyword: "",
            label: "",
            url: "",
            addDialogVisible: false,
            editDialogVisible: false,
            id: null
        };
    },
    async created() {
        this.getLinks();
    },
    methods: {
        async getLinks() {
            const me = this;
            const { success, data } = await me.axios.post(me.$api.GET_LINKS, { keyword: me.keyword });
            if (!success) return;
            me.links = data;
        },

        async delLink(id) {
            const me = this;
            const isConfirm = await me.showConfirm("是否确认删除该链接");
            if (!isConfirm) return;

            const res = await me.axios.post(me.$api.DELETE_LINK, { id });
            if (!res.success) return me.$message.error("删除失败");
            me.$message.success("删除成功");
            me.getLinks();
        },

        async showEditDialog(row) {
            const me = this;
            this.editDialogVisible = true;
            const { id, label, url } = row;
            me.id = id;
            me.label = label;
            me.url = url;
        },

        async updateLink() {
            const me = this;
            const { label, url, id } = me;
            const res = await me.axios.post(me.$api.UPDATE_LINK, { id, label, url });
            if (!res.success) return me.$message.error("修改失败");
            me.$message.success("修改成功");
            me.editDialogVisible = false;
            me.handleClose();
            me.getLinks();
        },

        async createLink() {
            const me = this;
            const { label, url } = me;
            const res = await me.axios.post(me.$api.CREATE_LINK, { label, url });
            if (!res.success) return me.$message.error("添加失败");
            me.$message.success("添加成功");
            me.addDialogVisible = false;
            me.handleClose();
            me.getLinks();
        },

        handleClose() {
            this.label = "";
            this.url = "";
        }
    }
};
</script>

<style scoped>
</style>
