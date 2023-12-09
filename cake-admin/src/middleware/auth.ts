import { defineNuxtRouteMiddleware, useCookie } from '#app'
import { storeToRefs } from 'pinia'
import { validateTokenApi } from '~/server/apis/validate'
import { useAuthStore } from '~/store/login'
import { useNavigationStore } from '~/store/navigation'
import { useRouter } from 'vue-router'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const router = useRouter()
  const { authenticated } = storeToRefs(useAuthStore())
  const authStore = useAuthStore()
  const navigationStore = useNavigationStore()

  // if (process.client) {
  const token = useCookie('cake-work-token') // token 儲存 cookie

  if (token.value) {
    try {
      const resValidate: any = await validateTokenApi()

      if (to.path === '/login') {
        // 如果用户未登录且尝试访问非登录页面，则重定向到登录页面
        return navigateTo('/')
      }
    } catch (error) {
      ElMessage({
        message: '登入無效',
        type: 'error',
      })
      return navigateTo('/login')
    }
  } else {
    if (to.path !== '/login') {
      console.log('vvv')
      return await navigateTo({ path: '/login' })
    }
  }
  // } else {
  //   return
  // }

  // if (isTokenExpired(token.value)) {
  //   if (to.path !== '/login') {
  //     // 如果用户未登录且尝试访问非登录页面，则重定向到登录页面

  //     ElMessage({
  //       message: '登入無效',
  //       type: 'error',
  //     })

  //     authStore.logout()
  //     authenticated.value = false

  //     return navigateTo('/login')
  //   }
  // } else {
  //   console.log('Token ok')

  //   if (token.value && to.path === '/login') {
  //     // 如果用户未登录且尝试访问非登录页面，则重定向到登录页面
  //     return navigateTo('/')
  //   }

  //   authenticated.value = true
  // }
})

//檢查 token 格式做初步驗證
function parseJwt(token: any) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join(''),
    )

    return JSON.parse(jsonPayload)
  } catch (error) {
    return null
  }
}

function isTokenExpired(token: any) {
  const payload = parseJwt(token)

  if (!payload) return true

  // 替 token 做時間驗證
  const currentTime = Date.now() / 1000
  return payload.exp < currentTime
}
