/*
 * @Author: Martin
 * @Date: 2020-11-20 11:24:29
 * @LastEditTime: 2020-11-20 11:25:16
 * @FilePath: \egg-practice\app\entend\context.js
 */
/**
 * context扩展
 */
module.exports = {
    // 成功提示
    apiSuccess(data = '', msg = 'ok', code = 200) {
        this.body = { msg, data };
        this.status = code;
    },
    // 失败提示
    apiFail(data = '', msg = 'fail', code = 400) {
        this.body = { msg, data };
        this.status = code;
    },
};