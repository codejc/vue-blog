<template>
  	<div id="app">
		<top-bar class="top-bar"></top-bar>
		<div class="layout-main">
			<router-view></router-view>
			<div class="home-side-wrap" ref="fixCard">
				<tab-card></tab-card>
				<hot-card></hot-card>
				<link-card></link-card>
			</div>
		</div>
    <!-- <back-to-top></back-to-top> -->
  </div>
</template>

<script>
import TopBar from "@/components/TopBar";
import TabCard from "@/components/TabCard";
import HotCard from "@/components/HotCard";
import LinkCard from "@/components/LinkCard";
import { GET_USERINFO } from "@/store/types";
import { mapState } from "vuex";

export default {
    name: "app",
    components: {
        TopBar,
        TabCard,
        HotCard,
        LinkCard
    },
    computed: mapState({
        userInfo: state => state.user.userInfo
    }),
    methods: {
        // 页面宽度变化时，右边的悬浮卡响应left改变
        handleResize() {
            const me = this;
            const clientWidth = document.body.clientWidth;
            const left = (clientWidth - 1140) / 2 + 820;
            if (left < 820) return;
            this.$refs.fixCard.style.left = left + "px";
        },
        // 获取用户信息，保存在store，每次进入网页都会获取一次用户信息和登录状态
        async getUserInfo() {
            await this.$store.dispatch(GET_USERINFO);
        },
        // 数据埋点，提交访问记录
        buryPoint() {
            const me = this;
            const { userName, loginId } = me.userInfo;
            me.axios.post(me.$api.BURY_POINT, { userName, loginId });
        }
    },
    async created() {
        await this.getUserInfo();
        this.buryPoint();
    },
    mounted() {
        const me = this;
        me.handleResize();
        window.onresize = () => {
            me.handleResize();
        };
    }
};
</script>

<style>
#app {
  	font-family: 'Avenir', Helvetica, Arial, sans-serif;
  	-webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
  	text-align: center;
  	color: #2c3e50;
  	height: 100%;
  	padding: 20px;
	overflow-y: auto;
}

.layout-main {
	width: 1140px;
	margin: 60px auto;
	position: relative;
	display: flex;
	align-items: flex-start;
}

.home-main-wrap {
    width: 800px;
    text-align: center;
    margin-right: 15px;
}

.home-side-wrap {
	position: fixed;
	top: 80px;
}
</style>
