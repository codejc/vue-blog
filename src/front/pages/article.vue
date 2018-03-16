<template>
    <div class="article" v-if="!loading">
        <div class="main">
            <header>
                <h3 class="title">{{article.title}}</h3>
                <div class="info-group">
                    <div><i class="fa fa-tags" aria-hidden="true"></i>{{article.tag}}</div>
                    <div><i class="fa fa-user-circle" aria-hidden="true"></i>{{article.author}}</div>
                    <div><i class="fa fa-eye" aria-hidden="true"></i>{{article.views}}</div>
                    <div><i class="fa fa-comments" aria-hidden="true"></i>{{article.commentList.length}}</div>
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
                        <div class="author">{{item.authorName}}
                            <span v-if="item.replyName">
                                <span class="reply-author">回复</span> {{item.replyName}}
                            </span>
                        </div>
                        <span class="nearly-date">1小时前</span>
                    </header>
                    <main>{{item.content}}</main>
                    <footer>
                        <span @click="showReplyDialog({ replyName: item.authorName, replyId: item.authorId, root: item.root || item.id || null })">回复</span> 
                        <span v-if="item.root && item.root !== item.id" @click="getCommentGroup(item.root)"> · 查看对话</span>
                    </footer>
                </li>
            </ul>
            <h3><i class="fa fa-user-circle" aria-hidden="true"></i> 发表评论</h3>
            <div class="form-comment" v-if="isLogin">
                <el-input
                    type="textarea"
                    class="textarea"
                    resize="none"
                    :rows="4"
                    placeholder="请输入评论"
                    v-model="comment">
                </el-input>
                <el-button class="submit" type="primary" @click="submitComment">提交评论</el-button>
            </div>
            <div class="no-login" v-else>请先<el-button type="text" @click="showLogin">登录</el-button></div>
        </div>

        <el-dialog
            title="回复"
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            :close="handleDialogClose"
            width="500px">
            <div class="form-comment">
                <el-input
                    type="textarea"
                    class="textarea"
                    resize="none"
                    :rows="4"
                    placeholder="请输入回复内容"
                    v-model="replyContent">
                </el-input>
                <el-button class="submit" type="primary" @click="submitReploy">提交回复</el-button>
            </div>
        </el-dialog>

        <el-dialog
            title="对话"
            :visible.sync="conversationVisable"
            :modal-append-to-body="false"
            width="500px">
            <ul class="comment-list">
                <li v-for="(item, index) in commentGroup" :key="index">
                    <header>
                        <div class="favicon"></div>
                        <div class="author">{{item.authorName}}
                            <span v-if="item.replyName">
                                <span class="reply-author">回复</span> {{item.replyName}}
                            </span>
                        </div>
                        <span class="nearly-date">1小时前</span>
                    </header>
                    <main>{{item.content}}</main>
                    <footer>
                        <span @click="showReplyDialog({ replyName: item.authorName, replyId: item.authorId, root: item.root|| item.authorId || null })">回复</span> 
                    </footer>
                </li>
            </ul>
        </el-dialog>

        <login-card ref="loginCard"></login-card>
    </div>
</template>

<script>
import { mapState } from "vuex";
import LoginCard from "@/components/LoginCard";

export default {
    components: {
        LoginCard
    },
    data() {
        return {
            aid: null,
            likeTimes: 12,
            comment: "",
            liked: false,
            article: {},
            loading: true,
            dialogVisible: false,
            conversationVisable: false,
            commentGroup: [],
            replyItem: null,
            replyContent: "",
            conversationId: null
        };
    },
    created() {
        this.aid = this.$route.query.id;
        this.getArticle();
    },
    computed: mapState({
        userInfo: state => state.user.userInfo,
        isLogin: state => state.user.isLogin
    }),
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
        },
        showLogin() {
            this.$refs.loginCard.open();
        },
        handleDialogClose() {
            const me = this;
            me.replyContent = "";
            me.replyId = null;
        },
        showReplyDialog(item) {
            const me = this;
            me.dialogVisible = true;
            me.replyItem = item;
        },
        async submitReploy() {
            const me = this;
            if (!me.isLogin) return me.showLogin();
            const params = {
                ...me.userInfo,
                ...me.replyItem,
                articleId: +me.$route.query.id,
                content: me.replyContent
            };
            const res = await me.axios.post(me.$api.POST_COMMENT, params);
            if (!res.success) return me.$message.error("回复失败");
            me.$message.success("回复成功");
            me.getArticle();
            me.dialogVisible = false;
            me.handleDialogClose();
        },
        async submitComment() {
            const me = this;
            if (!me.isLogin) return me.showLogin();
            const params = {
                ...me.userInfo,
                articleId: +me.$route.query.id,
                content: me.comment
            };
            const res = await me.axios.post(me.$api.POST_COMMENT, params);
            if (!res.success) return me.$message.error("评论失败");
            me.getArticle();
            me.comment = "";
            me.$message.success("评论成功");
        },
        async getCommentGroup(root) {
            const me = this;
            const res = await me.axios.post(me.$api.GET_COMMENT_GROUP, { root });
            if (!res.success) return me.$message.error("查看对话失败");
            me.commentGroup = res.data;
            me.conversationVisable = true;
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
        padding-bottom: 20px;
        h3 {
            padding: 10px 20px;
            background-color: rgb(247, 247, 247);
            color: rgb(103, 102, 102)
        }
    }

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

    .form-comment {
        overflow: hidden;
        .textarea {
            // margin: 20px;
            padding: 20px;
        }
        .submit {
            float: right;
            margin: 0 20px 0 20px;
        }
    }

    .no-login {
        text-align: center;
        margin-top: 20px;
    }
</style>
