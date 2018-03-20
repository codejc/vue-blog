/* eslint vars-on-top: 0 */
import storage from "store/dist/store.legacy";
import expirePlugin from "store/plugins/expire";

storage.addPlugin(expirePlugin);

export default {
    // 默认缓存 1 天
    duration: +new Date() + (24 * 60 * 60 * 1000),
    getStorage(key) {
        const me = this;
        const cacheData = storage.get(key);
        return cacheData;
    },
    setStorage(key, val, duration = this.duration) {
        const me = this;

        if (!duration) {
            storage.set(key, val);
        } else {
            storage.set(key, val, duration);
        }
    },
    removeStorage(key) {
        storage.remove(key);
    }
};
