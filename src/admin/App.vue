<template>
  	<div id="app">
        <side-menu v-if="isLogin"></side-menu>
        <router-view class="layout-main-wrap"></router-view>
    </div>
</template>

<script>
import { GET_USERINFO } from "@/store/types";
import SideMenu from "@/components/SideMenu";
import { mapState } from "vuex";

export default {
    name: "app",
    components: {
        SideMenu
    },
    computed: mapState({
        isLogin: state => state.user.isLogin
    }),
    methods: {
        // 获取用户信息，保存在store，每次进入网页都会获取一次用户信息和登录状态
        async getUserInfo() {
            this.$store.dispatch(GET_USERINFO);
        }
    },
    created() {
        this.getUserInfo();
    }
};
</script>

<style>
#app {
  	font-family: 'Avenir', Helvetica, Arial, sans-serif;
  	-webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  	color: #2c3e50;
    height: 100%;
    display: flex;
    width: 100%;
}

.layout-main-wrap {
    padding: 20px;
    margin: 20px;
    width: calc(100% - 240px);
    background-color: white;
    flex-grow: 1;
}


</style>
