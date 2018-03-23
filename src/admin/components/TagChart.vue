<template>
    <div id="tagChart" class="chart"></div>
</template>

<script>
import echarts from "echarts";

export default {
    data() {
        return {
            chart: null,
            tagData: {
                title: { text: "文章访问分布", subtext: "总计: 2000" },
                tooltip: {
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                roseType: "angle",
                legend: {
                    orient: "vertical",
                    left: "right",
                    data: []
                },
                series: [
                    {
                        name: "标签访问量",
                        type: "pie",
                        radius: "55%",
                        data: []
                    }
                ]
            }
        };
    },
    mounted() {
        this.chartInit();
        this.getChartData();
    },
    methods: {
        chartInit() {
            const me = this;
            me.chart = echarts.init(document.getElementById("tagChart"));
            me.chart.setOption(this.tagData);
        },
        async getChartData() {
            const me = this;
            const { data, total } = await me.axios.post(me.$api.GET_TAGCHART_DATA);
            const legend = data.map(item => item.name);
            me.chart.setOption({
                title: { subtext: `总计: ${total}` },
                legend: { data: legend },
                series: { data }
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
