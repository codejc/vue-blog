const host = "http://localhost:8888";

export default {
    GET_ARTICLE_LIST: `${host}/admin/getArticleList`,
    GET_ARTICLE: `${host}/admin/getArticleById`,
    LOGIN: `${host}/login`,
    GET_USERINFO: `${host}/getUserInfo`,
    REGISTER: `${host}/register`,
    DELETE_ARTICLE: `${host}/admin/delArticle`,
    UPDATE_ARTICLE: `${host}/admin/updateArticle`,
    GET_TAGS: `${host}/admin/getTags`,
    UPLOAD_IMAGE: `${host}/admin/uploadImage`
};
