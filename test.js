//设置日期，当前日期的前七天
var myDate = new Date(); //获取今天日期
myDate.setDate(myDate.getDate() - 7);
var dateArray = []; 
var dateTemp; 
var flag = 1; 
for (var i = 0; i < 7; i++) {
    dateTemp = (myDate.getMonth()+1)+"-"+myDate.getDate();
    dateArray.push(dateTemp);
    myDate.setDate(myDate.getDate() + flag);
}

console.log(dateArray);