const env = process.env.NODE_ENV;
const buildTimestamp = process.env.TIME_STAMP;

const appConfig = {
    development: {
        api: "http://localhost:8888"
    },
    production: {
        api: "http://193.112.27.192:8888"
    }
};

export default {
    env,
    buildTimestamp,
    ...appConfig[env]
};
