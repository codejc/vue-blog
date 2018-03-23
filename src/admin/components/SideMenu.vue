<template>
    <div class="sideMenu">
        <el-menu
            :default-active="activeIndex"
            :unique-opened="true"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :router="true"
        >
            <div class="sideMenu-user">
                <img src="../assets/logo.png" class="sideMenu-user-favicon" :class="{ 'isCollapse' :isCollapse }">
                <p class="sideMenu-user-name" :class="{isCollapse: isCollapse}">
                    {{isCollapse ? userInfo.userName.slice(0, 1) : userInfo.userName}}
                </p>
            </div>
            <div class="btn-collapse" @click="isCollapse = !isCollapse">
                <i v-if="!isCollapse" class="el-icon-caret-left"></i>
                <i v-else class="el-icon-caret-right"></i>
            </div>
            <el-menu-item index="/article">
                <i class="fa fa-th-large" aria-hidden="true"></i>
                <span slot="title">博文管理</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="fa fa-rss-square" aria-hidden="true"></i>
                    <span slot="title">版块管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/tag">
                        <i class="fa fa-tags" aria-hidden="true"></i>标签
                     </el-menu-item>
                    <!-- <el-menu-item index="hot">
                        <i class="fa fa-fire" aria-hidden="true"></i>热门
                    </el-menu-item> -->
                    <el-menu-item index="/link">
                        <i class="fa fa-link" aria-hidden="true"></i>外链
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu> 
            <el-menu-item index="/data">
                <i class="fa fa-pie-chart" aria-hidden="true"></i>
                <span slot="title">数据中心</span>
            </el-menu-item>
        <div class="logout" v-if="!isCollapse">
            <span class="btn-logout" @click="logout">
                <i class="fa fa-sign-out" aria-hidden="true"></i>退出登录
            </span>
        </div>
        </el-menu>
    </div>    
</template>

<script>
import { mapState } from "vuex";
import { DO_LOGOUT } from "@/store/types";
import storage from "@/assets/js/cache";
export default {
    data() {
        return {
            isCollapse: true
        };
    },
    computed: mapState({
        userInfo: state => state.user.userInfo,
        activeIndex() {
            return this.$route.name;
        }
    }),
    methods: {
        logout() {
            this.$store.commit(DO_LOGOUT);
            storage.removeStorage("token");
            this.$router.push({ path: "login" });
        }
    }
};
</script>

<style lang="less">
    .sideMenu {
        height: 100%;
        background-color: white;
        border-right: solid 1px #e6e6e6;
    }
    .el-menu--collapse {
        border-right: none;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        /* min-height: 400px; */
        height: 100%;
    }
    .el-menu-item {
        outline: none;
    }
    .btn-collapse {
        text-align: center;
        height: 50px;
        line-height: 50px;
        background-color: rgb(247, 247, 247);
    }
    .sideMenu-user {
        &-favicon {
            width: 40px;
            display: block;
            margin: 20px auto;
        }
        &-name {
            text-align: center;
            height: 40px;
            line-height: 40px;
            margin-bottom: 20px;
            &.isCollapse {
                width: 40px;
                border-radius: 50%;
                margin: 0 auto;
                margin-bottom: 20px;
                background-color: rgb(247, 247, 247);
            }
        }
    }
    .logout {
        position: absolute;
        bottom: 10px;
        width: 200px;
        // text-align: center;
        margin-left: 20px;
        padding-top: 10px;
        border-top: 1px solid rgb(247, 247, 247);
    }
    .btn-logout {
        cursor: pointer;
    }
    .fa {
        width: 20px;
        font-size: 16px;
        margin-left: 5px;
        margin-right: 5px;
    }
</style>