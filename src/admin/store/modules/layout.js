/**
 * 表格高度等于 body 高度减去顶部搜索栏以及分页栏以及相关内外边距后的值
 */
const tableHeightComputed = (val) => document.querySelector("body").offsetHeight - 184;

const layoutModule = {
    state: {
        tableHeight: tableHeightComputed()
    }
};

// 监听页面尺寸更改，动态刷新表格高度
window.onresize = () => {
    layoutModule.state.tableHeight = tableHeightComputed();
};

export default layoutModule;
