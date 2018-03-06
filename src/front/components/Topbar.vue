<template>
    <div class="tob-bar">
        <el-menu mode="horizontal" :default-active="$route.path" :router="true">
            <router-link class="brand" to="/" tag="h3">Jc Blog</router-link>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/chat">在线交流</el-menu-item>
            <el-input placeholder="请输入内容" v-model="keyword" class="input-with-select">
                <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                </el-select> -->
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword: "",
            pageSize: 10,
            pageNo: 1
        };
    },
    methods: {
        async search() {
            const me = this;
            const param = {
                pageSize: me.pageSize,
                pageNo: me.pageNo,
                keyword: me.keyword
            };
            const resp = await me.axios.post(me.$api.GET_ARTICLE_LIST, param);
            console.log(resp);
        }
    }
};
</script>

<style lang="less">
.tob-bar {
    .el-menu {
        position: fixed;
        top: 0;
        width: 100%;
        background: #324157;
        color: white;
        z-index: 4;
        .el-menu-item {
            color: #bfcbd9;
            font-weight: 500;
            &:hover {
                background: #324157;
                color: white;
            }
            &:active,
            &:focus {
                background: #324157;
            }
            &:focus {
                color: #bfcbd9;
            }
            &.is-active {
                color: white;
                background: #324157;
                border-bottom: 4px solid #35bc9b;
            }
        }
    }
    .brand {
        float: left;
        line-height: 59px;
        padding: 0 50px;
        user-select: none;
        cursor: pointer;
        outline: none;
    }
    .input-with-select {
        // display: inline-block;
        width: 230px;
        margin-top: 10px;
        float: right;
        margin-right: 50px;
    }
}
</style>