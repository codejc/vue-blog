<template>
    <div id="viewsChart" class="chart"></div>
</template>

<script>
import echarts from "echarts";

export default {
    data() {
        return {
            viewsChart: null,
            viewsData: {
                tooltip: {
                    trigger: "axis"
                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: { show: true, type: ["line", "bar"] },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                legend: {
                    data: ["访问数", "评论数", "点赞数"]
                },
                xAxis: {
                    type: "category"
                },
                yAxis: {
                    type: "value"
                },
                series: [{
                    name: "访问数",
                    type: "line",
                    smooth: true
                }, {
                    name: "评论数",
                    type: "line",
                    smooth: true
                }, {
                    name: "点赞数",
                    type: "line",
                    smooth: true
                }]
            }
        };
    },
    mounted() {
        // 在dom渲染完后初始化chart
        this.chartInit();
        this.getChartData();
    },
    methods: {
        chartInit() {
            const me = this;
            me.viewsChart = echarts.init(document.getElementById("viewsChart"));
            me.viewsChart.setOption(me.viewsData);
        },

        async getChartData() {
            const me = this;
            const { viewsData, commentData, likeData } = (await me.axios.post(me.$api.GET_SEVEN_DAYS)).data;
            const xAxis = Object.keys(viewsData);
            const views = xAxis.map(key => viewsData[key]);
            const comments = xAxis.map(key => commentData[key]);
            const likes = xAxis.map(key => likeData[key]);
            me.viewsChart.setOption({
                xAxis: {
                    data: xAxis.map(item => item.substring(5))
                },
                series: [{
                    name: "访问数",
                    data: views
                }, {
                    name: "评论数",
                    data: comments
                }, {
                    name: "点赞数",
                    data: likes
                }]
            });
        }
    }

};
</script>

<style lang="less" scoped>

.chart {
    height: 400px;
    width: 700px;
    // width: 100%;
    margin: 30px auto;
}
.chartContainer {
    width: 100%;
}
.chart-container {
    display: flex;
    justify-content: space-between;
}

</style>
