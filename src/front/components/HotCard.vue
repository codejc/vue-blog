<template>
    <div class="card-pane">
        <h3 class="title">最热</h3>
        <ul>
            <li class="link" v-for="(item, index) in hotList" :key="index">
                <span>{{item.title}}</span>
                <span class="date">{{item.date}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            hotList: [{
                date: "2017-02-27",
                title: "webpack 配置详解"
            }, {
                date: "2017-02-27",
                title: "webpack 配置详解"
            }, {
                date: "2017-02-27",
                title: "webpack 配置详解"
            }]
        };
    }
};
</script>

<style lang="less" scoped>
    @import "../assets/css/variable.less";
    .card-pane {
        width: 320px;
    }
    ul {
        list-style: none;
        text-align: left;
        .link {
            padding: 5px 10px;
            font-size: 14px;
            cursor: pointer;
            .date {
                float: right;
            }
            &:hover {
                opacity: .6;
            }
            border-bottom: 1px solid lightgrey;
            &:last-child {
                border-bottom: 1px solid @global-color-primary;
            }
        }
    }
</style>