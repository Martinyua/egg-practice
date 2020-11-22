/*
 * @Author: Martin
 * @Date: 2020-11-20 11:05:13
 * @LastEditTime: 2020-11-22 16:14:52
 * @FilePath: \egg-practice\app\router.js
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  //注册
  router.post('/reg',controller.user.reg)   
  //登录
  router.post('/login',controller.user.login)
};
