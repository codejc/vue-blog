const getMonth = (date) => {
    const m = date.getMonth() + 1;
    if (m < 10) {
        return `0${m}`;
    }
    return m;
};

/**
 * 获取过去n天的日期字符串数组（包含本日）
 * @param days 代表从今天倒数的天数，如果传递0，则代表获取今日的日期
 * */
export const getPastDays = (days = 6) => {
    // 设置日期，当前日期的前七天
    const myDate = new Date(); // 获取今天日期
    myDate.setDate(myDate.getDate() - days);
    const dateArray = [];
    let dateTemp;
    // 间隔天数
    const flag = 1;
    for (let i = 0; i < days + 1; i++) {
        dateTemp = myDate.getFullYear() + "-" + getMonth(myDate) + "-" + myDate.getDate();
        dateArray.push(dateTemp);
        myDate.setDate(myDate.getDate() + flag);
    }

    return dateArray.length === 1 ? dateArray[0] : dateArray;
};

// 时间格式化函数
export const dateFormat = (value, format = "yyyy-MM-dd hh:mm:ss") => {
    const date = new Date(value);
    const o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        "S": date.getMilliseconds() // 毫秒
    };

    let fmt = format;

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));

    Object.keys(o).forEach((k) => {
        if (new RegExp(`(${k})`).test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    });

    return fmt;
};
