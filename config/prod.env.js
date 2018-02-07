"use strict"
module.exports = {
  NODE_ENV: '"production"',
  // 在生产环境配置时间戳，配合部署缓存策略
  TIME_STAMP: +Date.now()
}
