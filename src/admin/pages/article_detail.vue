<template>
    <div class="article">
        <div class="layout-header">
            <el-input placeholder="请输入标题"  v-model="article.title">
                <template slot="prepend">标题</template>
            </el-input>
            <el-input placeholder="请输入作者" v-model="article.author">
                <template slot="prepend">作者</template>
            </el-input>
            <el-select v-model="article.tag" placeholder="请选择文章标签">
                <el-option
                    v-for="item in tags"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <div class="btn-group">
                <el-button @click="goBack">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>
        </div>
        <div class="layout-main">
            <mavon-editor ref="md" @imgAdd="imgAdd" class="md-editor" v-model="article.content"/>
        </div>
        <div class="layout-footer">
        </div>
    </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";

export default {
    props: {
        // 列表页传递给详情页的函数，在保存后触发，刷新列表页
        refresh: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            article: {
                content: ""
            },
            tagValue: null,
            tags: [],
            isEdit: false,
            articleId: +this.$route.params.id
        };
    },
    created() {
        this.getArticle();
        this.getTags();
    },
    methods: {
        async getArticle() {
            const me = this;
            if (me.articleId === 0) return;
            const res = await me.axios.post(me.$api.GET_ARTICLE, { id: me.articleId });
            me.article = res.data;
        },
        goBack() {
            this.$router.back();
        },
        async getTags() {
            const me = this;
            const res = await me.axios.post(me.$api.GET_TAGS);
            me.tags = res.data;
        },
        async save() {
            const me = this;
            me.article.updateTime = new Date();
            // 如果传入的文章id为0，则是新增页面，不传id给后台
            if (me.articleId === 0) {
                delete me.article.id;
                me.article.publish = 0;
            }
            const res = await me.axios.post(me.$api.UPDATE_ARTICLE, me.article);
            if (res.success) {
                me.$message.success("保存成功");
                me.goBack();
                me.refresh();
            }
        },
        async imgAdd(pos, file) {
            const me = this;
            const imgData = file.miniurl;
            const type = file.type.split("/")[1];
            // 上传至服务器，并接受生成的图片url
            const { url } = (await me.axios.post(me.$api.UPLOAD_IMAGE, { imgData, type })).data;
            // 将图片url替换markdown中的本地路径
            me.$refs.md.$img2Url(pos, url);
        }
    }
};
</script>

<style lang="less" scoped>
    .md-editor {
        height: 500px;
    }
</style>
