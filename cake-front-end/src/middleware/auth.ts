import { defineNuxtRouteMiddleware, useCookie } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('cake-token') // 假设使用 cookie 存储 token

  if (
    (!token.value && to.path === '/member-order') ||
    (!token.value && to.path === '/shopping-cart')
  ) {
    // 如果用户未登录且尝试访问非登录页面，则重定向到登录页面
    return navigateTo('/')
  }

  // 如果用户已登录或访问的是登录页面，则继续
})
