/*
 * @Author: Martin
 * @Date: 2020-11-22 13:56:33
 * @LastEditTime: 2020-11-22 14:39:16
 * @FilePath: \egg-practice\app\controller\user.js
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async reg() {
    let { ctx, app } = this;
    //参数验证
    ctx.validate({
      username: {
        type: 'string',
        required: true,
        desc: '用户名',
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码',
        range: {
          min: 8,
          max: 16
        }
      },
      repassword: {
        type: 'string',
        required: true,
        desc: '确认密码'
      }
    }, {
      equals: [
        ['password', 'repassword']
      ]
    })
    let { username, password, repassword } = ctx.request.body
    if (await app.model.User.findOne({
      where: {
        username
      }
    })) {
      ctx.throw(400, '用户已存在')
    }
    //创建用户
    let user = await app.model.User.create({
      username,
      password
    })
    if (!user) {
      ctx.throw(400, '创建用户失败')
    }
    ctx.apiSuccess(user)
  }
}

module.exports = UserController;
