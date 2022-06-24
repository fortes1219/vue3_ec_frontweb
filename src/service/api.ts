import { request } from '@/service/request'

/* 取得登入OTP碼 */
export const getOtp = (params) =>
  request({
    url: '/member/otp',
    method: 'get',
    headers: { 'Content-Type': 'text/plain' },
    params
  })

/* 會員登入 */
export const memberLogin = (params) =>
  request({
    url: '/member/login',
    method: 'post',
    headers: { 'Content-Type': 'text/plain' },
    params
  })

/* 會員註冊 */
export const memberRegister = (params) =>
  request({
    url: '/member/register',
    method: 'post',
    headers: { 'Content-Type': 'text/plain' },
    params
  })

/* 商品列表 */
export const goodsList = (params) =>
  request({
    url: '/member/goods/list',
    method: 'post',
    headers: { 'Content-Type': 'text/plain' },
    params
  })
