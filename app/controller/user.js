/*
 * @Author: Martin
 * @Date: 2020-11-22 13:56:33
 * @LastEditTime: 2020-11-22 17:01:33
 * @FilePath: \egg-practice\app\controller\user.js
 */
'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto')

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
  /**
   * 登录
   * 参数验证
   * 验证密码
   * 生成token
   * 返回用户信息和token
   */
  async login() {
    const { ctx, app } = this
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
      }
    })
    let { username, password } = ctx.request.body
    let user = await app.model.User.findOne({
      where: {
        username,
        status: 1
      }
    })
    if (!user) {
      ctx.throw(400, '用户不存在或用户被禁用')
    }
    //验证密码
    await this.checkPassword(password, user.password)
    ctx.apiSuccess(user)
  }
  //验证密码
  async checkPassword(password, hash_password) {
    const hmac = crypto.createHash("sha256", this.app.config.crypto.secret);
    hmac.update(password);
    password = hmac.digest("hex");
    if (password != hash_password) {
      this.ctx.throw(400, '密码错误')
    }
  }
}

module.exports = UserController;
