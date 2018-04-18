<template>
    <div class="data">
        <div class="data-pane">
            <div class="item">
                <p class="title">总访问数</p>
                <p class="content">{{mainData.total}}</p>
            </div>
            <div class="item">
                <p class="title">今日访问数</p>
                <p class="content">{{mainData.today}}</p>
            </div>
            <div class="item">
                <p class="title">注册用户数</p>
                <p class="content">{{mainData.users}}</p>
            </div>
        </div>
        <el-tabs v-model="tabValue" type="border-card">
            <el-tab-pane label="七日数据" name="0"></el-tab-pane>
            <el-tab-pane label="浏览分布" name="1"></el-tab-pane>
            <el-tab-pane label="文章热度" name="2"></el-tab-pane>
            <el-tab-pane label="平均停留" name="3"></el-tab-pane>
            <div class="chartContainer">
                <views-chart v-show="+tabValue === 0"></views-chart>
                <tag-chart v-show="+tabValue === 1"></tag-chart>
                <views-rank v-show="+tabValue === 2"></views-rank>
                <stay-chart v-show="+tabValue === 3"></stay-chart>
            </div>
        </el-tabs>
    </div>
</template>

<script>
import TagChart from "../components/TagChart";
import ViewsChart from "../components/ViewsChart";
import ViewsRank from "../components/ViewsRank";
import StayChart from "../components/StayChart";

export default {
    components: {
        TagChart,
        ViewsChart,
        ViewsRank,
        StayChart
    },
    data() {
        return {
            tabValue: 0,
            mainData: {}
        };
    },
    created() {
        this.getMainData();
    },
    methods: {
        async getMainData() {
            const me = this;
            const { data } = await me.axios.post(me.$api.GET_MAIN_DATA);
            me.mainData = data;
        }
    }

};
</script>

<style lang="less" scoped>
.data {
    overflow-y: auto;
}
.chart-container {
    display: flex;
    justify-content: space-between;
}
.data-pane {
    display: flex;
    justify-content: space-around;
    height: 130px;
    padding: 30px 0;
    margin-bottom: 30px;
    border: 1px solid rgb(238, 238, 238);
    .item {
        text-align: center;
    }
    .title {
        font-size: 24px;
        font-weight: 500;
    }
    .content {
        font-size: 18px;
        color: #888888;
        margin-top: 10px;
    }
}
</style>
