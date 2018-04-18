async function sleep() {
    setTimeout(()=> {
        resolve(1);
    }, 1000);
}

let total = 0;

// 执行四次循环，累加total
for (let i = 0; i < 4; i++) {
    const res = await sleep;
    total += res;
}

console.log(total); // 0 forEach中并没有获取到sleep()执行完的返回值