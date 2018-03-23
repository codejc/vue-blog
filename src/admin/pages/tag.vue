<template>
    <div class="jc-login">
        <div class="layout-header">
            <el-input placeholder="请输入关键词" v-model="keyword"></el-input>
            <el-button type="primary" @click="getTags">搜索</el-button>
            <div class="btn-group">
            <el-button type="primary" @click="dialogVisible = true">新增</el-button>
            </div>
        </div>
        <div class="layout-main">
            <el-table :data="tags" :height="tableHeight">
                <el-table-column prop="value" label="标签类型" show-overflow-tooltip></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="delTag(scope.row.id)"> 删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog
            title="新增标签"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :close="handleClose"
            label-width="100px"
            width="320px">
            <el-input v-model="tagName" placeholder="请输入标签名称"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createTag">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "tagsManage",
    computed: mapState({
        tableHeight: state => state.layout.tableHeight
    }),
    data() {
        return {
            tags: [],
            pageNo: 1,
            keyword: "",
            tagName: "",
            dialogVisible: false
        };
    },
    async created() {
        this.getTags();
    },
    methods: {
        async getTags() {
            const me = this;
            const { success, data } = await me.axios.post(me.$api.GET_TAGS, { keyword: me.keyword });
            if (!success) return;
            me.tags = data;
        },

        async delTag(id) {
            const me = this;
            const isConfirm = await me.showConfirm("是否确认删除该标签");
            if (!isConfirm) return;

            const res = await me.axios.post(me.$api.DELETE_TAG, { id });
            if (!res.success) return me.$message.error("删除失败");
            me.$message.success("删除成功");
            me.getTags();
        },

        async createTag() {
            const me = this;
            const res = await me.axios.post(me.$api.CREATE_TAG, { value: me.tagName });
            if (!res.success) return me.$message.error("添加失败");
            me.$message.success("添加成功");
            me.handleClose();
            me.getTags();
        },

        handleClose() {
            this.dialogVisible = false;
        }
    }
};
</script>

<style scoped>
</style>
