/*
 * @Author: Martin
 * @Date: 2020-11-20 11:05:13
 * @LastEditTime: 2020-11-22 14:21:23
 * @FilePath: \egg-practice\config\plugin.js
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  valparams: {
    enable: true,
    package: 'egg-valparams'
  },
};
