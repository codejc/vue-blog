<template>
    <div class="article" v-if="!loading">
        <div class="main">
            <header>
                <h3 class="title">{{article.title}}</h3>
                <div class="info-group">
                    <div><i class="fa fa-tags" aria-hidden="true"></i>{{article.tag}}</div>
                    <div><i class="fa fa-user-circle" aria-hidden="true"></i>{{article.author}}</div>
                    <div><i class="fa fa-eye" aria-hidden="true"></i>{{article.views}}</div>
                    <div><i class="fa fa-comments" aria-hidden="true"></i>{{0}}</div>
                    <div><i class="fa fa-clock-o" aria-hidden="true"></i>{{article.updateTime}}</div>
                </div>
            </header>
            <div class="content" v-html="article.content"></div>
            <footer>
                <el-button type="danger" :disabled="liked" @click="doLike"><i class="fa fa-heart-o" aria-hidden="true"></i> 点赞({{article.likes}})</el-button>
            </footer>
        </div>
        <div class="comment">
            <h3><i class="fa fa-commenting" aria-hidden="true"></i> {{article.commentList.length}}条评论</h3>
            <ul class="comment-list">
                <p v-if="!article.commentList">暂无评论</p>
                <li v-for="(item, index) in article.commentList" :key="index">
                    <header>
                        <div class="favicon"></div>
                        <div class="author">{{item.author}}
                            <span v-if="item.replyAuthor">
                                <span class="reply-author">回复</span> {{item.replyAuthor}}
                            </span>
                        </div>
                        <span class="nearly-date">1小时前</span>
                    </header>
                    <main>{{item.content}}</main>
                    <footer>
                        <span>回复</span> · 
                        <span>查看对话</span>
                    </footer>
                </li>
            </ul>
            <h3><i class="fa fa-user-circle" aria-hidden="true"></i> 发表评论</h3>
            <el-input
                type="textarea"
                class="textarea"
                resize="none"
                :rows="4"
                placeholder="请输入评论"
                v-model="comment">
            </el-input>
            <el-button class="submit" type="primary">提交评论</el-button>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            aid: null,
            likeTimes: 12,
            comment: "",
            liked: false,
            article: {},
            loading: true
        };
    },
    created() {
        this.aid = this.$route.query.id;
        this.getArticle();
    },
    methods: {
        async doLike() {
            const me = this;
            const res = await me.axios.post(me.$api.DO_LIKE, { id: me.$route.query.id });
            if (!res.success) return me.$message.error("点赞失败");
            me.$message.success("点赞成功");
            this.liked = true;
            this.article.likes++;
        },
        async getArticle() {
            const me = this;
            const res = await me.axios.post(me.$api.GET_ARTICLE, { id: me.$route.query.id });
            res.data.commentList.forEach(item => {
                item.showReply = false;
            });
            me.loading = false;
            me.article = res.data;
        }
    }
};
</script>

<style lang="less" scoped>
    .article {
        width: 800px;
        text-align: left;
    }

    .main {
        width: 100%;
        background-color: white;
        header {
            padding: 20px 20px 15px 20px;
            border-bottom: 1px solid rgb(247, 247, 247);
        }

        footer {
            width: 100%;
            margin-top: 50px;
            padding: 30px;
            border-top: 1px solid rgb(247, 247, 247);
            text-align: center;
        }
    }

    .content {
        padding: 20px;
    }

    .comment {
        background-color: white;
        margin-top: 20px;
        overflow: hidden;
        .comment-list {
            min-height: 100px;
            padding: 20px;
            list-style: none;
            li {
                padding-bottom: 15px;
                border-bottom: 1px dashed rgb(247, 247, 247);
                &:not(:first-child) {
                    margin-top: 20px;
                }
            }
            header {
                line-height: 30px;
                .favicon {
                    width: 30px;
                    height: 30px;
                    background-color: lightgray;
                    margin-right: 10px;
                    float: left;
                }
                .author {
                    float: left;
                }
                .nearly-date {
                    float: right;
                    color: #888888;
                }
                .reply-author {
                    color: #888888;
                    padding: 0 5px;
                    font-weight: 500;
                }
            }
            main {
                // margin-top: 10px;
                padding-top: 10px;
                clear: both;
            }
            footer {
                color: rgb(61, 97, 155);
                // margin-left: 40px;
                padding-top: 10px;
                >span:hover {
                    border-bottom: 1px solid rgb(61, 97, 155);
                    cursor: pointer;
                }
            }
            .reply-pane {
                margin-left: 40px;
                margin-top: 15px;
            }
        }
        h3 {
            padding: 10px 20px;
            background-color: rgb(247, 247, 247);
            color: rgb(103, 102, 102)
        }
        .textarea {
            // margin: 20px;
            padding: 20px;
        }
        .submit {
            float: right;
            margin: 0 20px 20px 20px;
        }
    }

    .title {
        font-size: 24px;
        padding: 0;
    }

    .fa {
        margin-right: 3px;
    }

    .info-group {
        margin-top: 10px;
        padding-bottom: 20px;
        > div {
            float: left;
            margin-right: 15px;
        }
    }

    .like {
        width: 100px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        // border-radius: 4px;
        margin: 0 auto;
        background-color: rgb(247, 111, 106);
        color: white;
        font-size: 14px;
        user-select: none;
    }
</style>
