const error = (msg, code) => {
    return {
        code: code || "1001",
        message: msg || "数据库查询失败！",
        success: false
    };
};

const success = (resp, msg) => {
    if (typeof resp === "string") msg = resp;
    return {
        code: "1000",
        message: msg || "处理成功",
        data: resp || {},
        success: true
    };
};

module.exports = { error, success };
