<template>
    <div class="thumb-pane">
        <div class="header">
            <h3 class="tag" @click="searchByTag">{{article.tag}}</h3>
            <h3 class="title" @click="viewArticle">{{article.title}}</h3>
            <span class="date">{{article.updateTime | dateFormat}}</span>
        </div>
        <div class="center">
            <p>{{article.content}}</p>
        </div>
        <div class="footer">
            <div><i class="fa fa-user-circle" aria-hidden="true"></i> {{article.author}}</div>
            <div><i class="fa fa-eye" aria-hidden="true"></i> {{article.views || 0}}</div>
            <div class="comment"><i class="fa fa-comments" aria-hidden="true"> {{article.comments}}</i></div>
            <div class="like"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {{article.likes || 0}}</div>
            <el-button class="read-more" type="text" @click="viewArticle">阅读全文 >></el-button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        article: Object,
        default: {}
    },
    data() {
        return {};
    },
    methods: {
        searchByTag() {
            this.$router.push({ path: "search", query: { tag: this.article.tag } });
        },
        viewArticle() {
            this.$router.push({ name: "article", query: { id: this.article.id } });
        }
    }
};
</script>

<style lang="less">
@import "../assets/css/variable.less";
    .thumb-pane {
        width: 100%;
        background-color: white;
        padding: 20px 20px 0 20px;
        text-align: left;
        margin-bottom: 15px;
        > div:not(:last-child) {
            margin-bottom: 15px;
        }

        // 防止列表li设为inline-block时序列号消失。使用计数器
        ol,
        ul {
            display: inline-block;
            counter-reset: LIST-ITEMS;
            li {
                display: inline-block;
                margin-left: 10px;
                list-style-type: decimal;
                list-style-position: inside;
            }
            li:before {
            content: counter( LIST-ITEMS ) ".";
                counter-increment: LIST-ITEMS;
            }
        }

        .title {
            display: inline-block;
            padding-left: 10px;
            line-height: 25px;
            cursor: pointer;
            &:hover {
                color: black;
            }
        }
        .date {
            float: right;
            color: #999;
            line-height: 25px;
        }
        .footer {

            overflow: hidden;
            color: #999;
            line-height: 48px;
            > div {
                margin-right: 15px;
                float: left;
            }
            .like,
            .comment {
                cursor: pointer;
                &:hover {
                    color: @global-text-color;
                }
            }
        }
        .read-more {
            margin-left: 10px;
            float: right;
            line-height: 22px;
        }
    }
</style>