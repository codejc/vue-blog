<template>
    <div class="card-pane link">
        <h3 class="title">友情链接</h3>
        <template v-for="link in links">
            <el-button class="btn-link" type="text" @click="goLink(link.url)" :key="link.id">{{link.label}}</el-button>
            <!-- <a class="btn-link" :href="link.url" :key="link.id">{{link.label}}</a> -->
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            links: []
        };
    },
    created() {
        this.getLinks();
    },
    methods: {
        async getLinks() {
            const me = this;
            const { success, data } = await me.axios.post(me.$api.GET_LINKS);
            if (!success) return;
            me.links = data;
        },

        goLink(url) {
            window.open(url);
        }
    }
};
</script>

<style lang="less">

    .card-pane.link {
        text-align: left;
        li {
            float: left;
        }
        .btn-link {
            padding-bottom: 3px;
            font-size: 16px;
            margin-right: 20px;
        }
        .btn-link:hover {
            opacity: .8;
            border-bottom: 1px solid;
            // color: #2c3e50;
            // color: black;
        }
    }
</style>