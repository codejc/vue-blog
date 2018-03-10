const error = (msg) => {
    return {
        responseCode: "1001",
        responseMessage: msg || "数据库查询失败！",
        success: false
    };
};

const success = (resp, msg) => {
    if (typeof resp === "string") msg = resp;
    return {
        responseCode: "1000",
        responseMessage: msg || "处理成功",
        data: resp || {},
        success: true
    };
};

module.exports = { error, success };
