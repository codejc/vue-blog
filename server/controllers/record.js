
import Record from "../models/record";
import Comment from "../models/comment";
import Tag from "../models/tag";
import View from "../models/view";
import Like from "../models/like";
import express from "express";
import { getPastDays, dateFormat } from "../util/date";
import { Recorded } from "rx";

const router = express.Router();

// 数据埋点，添加访问记录
router.post("/buryPoint", async (req, res) => {
    try {
        const data = await Record.addRecord(req.body);
        res.json({ code: "1000", message: "处理成功", data, success: true });
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
            data.viewsData[dateGroup[i]] = (await Record.getRecordByDate(dateGroup[i])).length;
            data.commentData[dateGroup[i]] = (await Comment.getCommentsByDate(dateGroup[i])).length;
            data.likeData[dateGroup[i]] = (await Like.getLikesByDate(dateGroup[i])).length;
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
        const tags = await Tag.getTags();
        const data = [];
        let total = 0;
        for (let i = 0; i < tags.length; i++) {
            const name = tags[i].label;
            const value = (await View.getViewsByTag(name)).length;
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
        const total = (await Record.getTotal())[0].total;
        const today = (await Record.getRecordByDate(getPastDays(0))).length;
        res.json({ code: "1000", message: "处理成功", data: { total, today }, success: true });
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
                views = (await View.getViewsByDate(getPastDays(0)));
                break;
            case "周":
                // 获取今天开始倒数七天的数据，遍历每天的数据，push到views里
                const dateGroup = getPastDays(7);
                for (let i = 0; i < dateGroup.length; i++) {
                    const oneDayData = await View.getViewsByDate(dateGroup[i]);
                    // concat 此处使用无效，等待验证
                    oneDayData.forEach(item => views.push(item));
                }
                break;
            case "月":
                // 获取当前月份字符串类似 2018-03，当参数传入，查找当前月的所有数据
                views = await View.getViewsByDate(dateFormat(Date.now(), "yyyy-MM"));
                break;
            case "总":
                // 传入空字符串，获取所有数据
                views = await View.getViewsByDate("");
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
});


export default router;
