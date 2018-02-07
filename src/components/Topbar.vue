<template>
    <div class="tob-bar">
        <el-menu mode="horizontal" :default-active="$route.path" :router="true">
            <router-link class="brand" to="/" tag="h3">Jc Blog</router-link>
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/chat">在线交流</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {};
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
}
</style>