<template>
    <div>
        <el-card class="box-card">
            <el-radio-group class="radio-group" v-model="rankType" @change="getRankData">
                <el-radio-button label="日"></el-radio-button>
                <el-radio-button label="周"></el-radio-button>
                <el-radio-button label="月"></el-radio-button>
                <el-radio-button label="总"></el-radio-button>
            </el-radio-group>
            <el-table :data="rankData">
                <el-table-column
                    label="排名"
                    type="index">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="标题"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="views"
                    label="浏览数">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>

export default {
    data() {
        return {
            rankType: "日",
            rankData: []
        };
    },
    created() {
        this.getRankData();
    },
    methods: {
        async getRankData() {
            const me = this;
            const res = await me.axios.post(me.$api.GET_VIEWS_RANK, { rankType: me.rankType });
            me.rankData = res.data;
        }
    }

};
</script>

<style lang="less" scoped>
    .box-card {
        width: 50%;
        margin: 30px auto;
        height: 400px;
    }

    .radio-group {
        margin-bottom: 20px;
    }
</style>
