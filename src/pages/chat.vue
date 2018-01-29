<template>
    <div class="chat-main-wrap">
        <div class="message-box">

        </div>
        <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="message">
        </el-input>
        <div class="btn-group">
            <el-button type="primary">发送</el-button>
            <el-button>清空</el-button>
        </div>
    </div>
</template>

<script>
import api from "@/assets/js/api.js";
export default {
    name: "Login",
    data() {
        return {
            message: null
        };
    },
    async created() {
        const resp = await this.axios.post(api.GET_ARTICLE_LIST);
        console.log(resp);
    }
};
</script>

<style lang="less" scoped>
    .message-box {
        width: 100%;
        height: 400px;
        background-color: white;
        overflow: scroll;
        margin-bottom: 20px;
    }
    .chat-main-wrap {
        width: 600px;
        margin: 0 auto;
    }
    .btn-group {
        margin-top: 20px;
    }
</style>
