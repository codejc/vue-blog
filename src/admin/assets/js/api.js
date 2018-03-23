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
    UPLOAD_IMAGE: `${host}/admin/uploadImage`,
    PUBLISH_ARTICLE: `${host}/admin/publishArticle`,
    CREATE_TAG: `${host}/admin/createTag`,
    DELETE_TAG: `${host}/admin/delTag`,
    GET_LINKS: `${host}/admin/getLinks`,
    CREATE_LINK: `${host}/admin/createLink`,
    DELETE_LINK: `${host}/admin/delLink`,
    UPDATE_LINK: `${host}/admin/updateLink`,
    GET_SEVEN_DAYS: `${host}/admin/getSevenDaysRecords`,
    GET_TAGCHART_DATA: `${host}/admin/getTagChartData`,
    GET_MAIN_DATA: `${host}/admin/getMainData`,
    GET_VIEWS_RANK: `${host}/admin/getViewsRank`
};
