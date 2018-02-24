<template>
    <div class="thumb-pane">
        <div class="header">
            <h3 class="tag">{{article.tag}}</h3>
            <h3 class="title">{{article.title}}</h3>
            <span class="date">{{article.updateTime}}</span>
        </div>
        <div class="center">
            <p>{{article.content}}</p>
        </div>
        <div class="footer">
            <div><i class="fa fa-user-circle" aria-hidden="true"></i> {{article.author}}</div>
            <div><i class="fa fa-eye" aria-hidden="true"></i> {{article.history}}</div>
            <div class="comment"><i class="fa fa-comments" aria-hidden="true"></i>  {{article.comments.length}}</div>
            <div class="like"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>  {{article.history}}</div>
            <el-button class="read-more" type="text">阅读全文 >></el-button>
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
    }
};
</script>

<style lang="less" scoped>
@import "../assets/css/variable.less";
    .thumb-pane {
        width: 100%;
        background-color: white;
        padding: 20px;
        text-align: left;
        > div:not(:last-child) {
            margin-bottom: 15px;
        }
        margin-bottom: 15px;
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
</style>