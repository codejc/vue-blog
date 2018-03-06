module.exports = (data) => {
    let dataFmt = {}
    if (data) {
        dataFmt = {
            responseCode: "1000",
            responseMessage: "处理成功",
            data: data,
            success: true
        };
    } else {
        dataFmt = {
            responseCode: "1001",
            responseMessage: "数据库查询失败！",
            data: [],
            success: false
        };
    }

    return dataFmt;
}