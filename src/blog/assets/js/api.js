
import config from "./config";

const host = config.api;

export default {
    GET_ARTICLE_LIST: `${host}/getArticleList`,
    GET_ARTICLE: `${host}/getArticleById`,
    DO_LIKE: `${host}/doLikeById`,
    LOGIN: `${host}/login`,
    GET_USERINFO: `${host}/getUserInfo`,
    REGISTER: `${host}/register`,
    POST_COMMENT: `${host}/comment`,
    GET_COMMENT_GROUP: `${host}/getCommentGroup`,
    GET_LINKS: `${host}/getLinks`,
    GET_TAGS: `${host}/getTags`,
    BURY_POINT: `${host}/buryPoint`
};
