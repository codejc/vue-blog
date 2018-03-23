<template>
    <div class="card-pane">
        <h3 class="title">标签</h3>
        <div class="tags">
            <div class="tag" @click="goSearch(item)" v-for="(item, index) in tags" :style="{ backgroundColor: colors[index] }" :key="index" >
                {{item.label}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tags: [
                "Javascript",
                "HTML5",
                "CSS",
                "node.js",
                "Nginx",
                "IE",
                "webpack",
                "Vue",
                "ES6",
                "npm"
            ],
            colors: []
        };
    },
    created() {
        this.getTags();
    },
    methods: {
        createColor() {
            const me = this;
            me.tags.forEach(item => {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                const color = `rgb(${r},${g},${b})`;
                me.colors.push(color);
            });
        },
        async getTags() {
            const me = this;
            const { success, data } = await me.axios.post(me.$api.GET_TAGS);
            if (!success) return;
            me.tags = data;
            me.createColor();
        },
        goSearch(item) {
            this.$router.push({ path: "search", query: { tag: item.label } });
        }
    }
};
</script>

<style lang="less" scoped>

    .tags {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    .tag {
        margin: 10px 10px 0 0;
        transition: all .2s;
        &:hover {
            margin-top: 8px;
            box-shadow: 1px 1px 5px grey;
        }
    }
</style>