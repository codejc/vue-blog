<template>
    <div id="stayChart" class="chart"></div>
</template>

<script>
import echarts from "echarts";

export default {
    data() {
        return {
            stayChart: null,
            viewsData: {
                title: { text: "平均访问时长（分钟）" },
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
                xAxis: {
                    type: "category"
                },
                yAxis: {
                    type: "value"
                },
                series: [{
                    name: "平均访问时长",
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
            me.stayChart = echarts.init(document.getElementById("stayChart"));
            me.stayChart.setOption(me.viewsData);
        },

        async getChartData() {
            const me = this;
            const { data } = await me.axios.post(me.$api.GET_STAY_TIME);
            const xAxis = Object.keys(data);
            const avgTime = xAxis.map(key => data[key]);
            me.stayChart.setOption({
                xAxis: {
                    data: xAxis.map(item => item.substring(5))
                },
                series: [{
                    name: "平均访问时长",
                    data: avgTime
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
