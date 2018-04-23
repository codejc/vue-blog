
import { getPastDays, dateFormat } from "../util/date";

export default (router) => {
    // 添加网站访问记录
    router.post("/addRecod", async (req, res) => {
        try {
            const data = await req.models.record.addRecord(req.body);
            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    // 添加文章浏览记录
    .post("/addView", async (req, res) => {
        try {
            await req.models.view.AddViewsById(req.body);
            res.json({ code: "1000", message: "处理成功", success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    // 获取过去七天的记录
    .post("/admin/getSevenDaysRecords", async (req, res) => {
        try {
            const dateGroup = getPastDays();
            const data = {
                viewsData: {},
                commentData: {},
                likeData: {}
            };

            for (let i = 0; i < dateGroup.length; i++) {
                data.viewsData[dateGroup[i]] = (await req.models.record.getRecordByDate(dateGroup[i])).length;
                data.commentData[dateGroup[i]] = (await req.models.comment.getCommentsByDate(dateGroup[i])).length;
                data.likeData[dateGroup[i]] = (await req.models.like.getLikesByDate(dateGroup[i])).length;
            }
            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    // 获取文章访问分布数据
    .post("/admin/getTagChartData", async (req, res) => {
        try {
            const tags = await req.models.tag.getTags();
            const data = [];
            let total = 0;
            for (let i = 0; i < tags.length; i++) {
                const name = tags[i].label;
                const value = (await req.models.view.getViewsByTag(name)).length;
                total += value;
                data.push({ name, value });
            }
            res.json({ code: "1000", message: "处理成功", data, success: true, total });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    // 获取主要数据，访问量，注册用户数等
    .post("/admin/getMainData", async (req, res) => {
        try {
            const total = (await req.models.record.getTotal())[0].total;
            const today = (await req.models.record.getRecordByDate(getPastDays(0))).length;
            const users = (await req.models.user.getUserLength())[0].length;

            res.json({ code: "1000", message: "处理成功", data: { total, today, users }, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    .post("/admin/getViewsRank", async (req, res) => {
        try {
            let views = [];
            const { rankType } = req.body;

            // 接收前端的参数，以日、周、月、总 四个维度取相应日期的数据
            switch (rankType) {
                case "日":
                    views = (await req.models.view.getViewsByDate(getPastDays(0)));
                    break;
                case "周":
                    // 获取今天开始倒数七天的数据，遍历每天的数据，push到views里
                    const dateGroup = getPastDays();
                    // 遍历执行所有异步请求，获取结果数组
                    const dayData = await Promise.all(dateGroup.map(item => req.models.view.getViewsByDate(item)));
                    // 快速累加获取的每天日期的结果数组
                    views = dayData.reduce((init, child) => init.concat(child), []);
                    break;
                case "月":
                    // 获取当前月份字符串类似 2018-03，当参数传入，查找当前月的所有数据
                    views = await req.models.view.getViewsByDate(dateFormat(Date.now(), "yyyy-MM"));
                    break;
                case "总":
                    // 传入空字符串，获取所有数据
                    views = await req.models.view.getViewsByDate("");
                    break;
                default:
                    break;
            }

            const dayRank = {};
            const data = [];
            // 根据id获取文章名称
            const getName = (id) => views.filter(item => +item.articleId === +id)[0].title;
            // 将文章id设为key，文章的访问量为value组成键值对
            views.forEach((item, index) => {
                if (dayRank[item.articleId]) {
                    dayRank[item.articleId]++;
                } else {
                    dayRank[item.articleId] = 1;
                }
            });

            Object.keys(dayRank).forEach(key => {
                data.push({
                    name: getName(key),
                    views: dayRank[key]
                });
            });
            // 按照访问次数降序排列
            data.sort((a, b) => b.views - a.views);
            // 只截取排行前十
            res.json({ code: "1000", message: "处理成功", data: data.slice(0, 10), success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    })
    .post("/admin/getStayTimeData", async (req, res) => {
        try {
            const dateGroup = getPastDays();
            const data = {};

            for (let i = 0; i < dateGroup.length; i++) {
                const records = await req.models.record.getRecordByDate(dateGroup[i]);
                // 累加每条数据里的停留时间,转成分钟
                data[dateGroup[i]] = ((records.reduce((a, b) => a + b.duration, 0) / (records.length * 60000)) || 0).toFixed(2);
            }

            res.json({ code: "1000", message: "处理成功", data, success: true });
        } catch (e) {
            console.log(e);
            res.json({ code: "1001", message: "数据库查询失败", success: false });
        }
    });
};

