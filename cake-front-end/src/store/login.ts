import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { memberLoginApi } from '~/server/apis/login'

export const useAuthStore = defineStore('auth', {
  state: (): any => ({
    currentLoginUserData: null,
    authenticated: false,
  }),
  getters: {
    isCurrentLogin: (state) => {
      if (state.currentLoginUserData) {
        console.log('有登入', state.currentLoginUserData)
        return true
      } else {
        console.log('沒登入', state.currentLoginUserData)
        return false
      }
    },
  },
  actions: {
    async login(userLoginData: any) {
      try {
        let { data }: any = await memberLoginApi(userLoginData)

        if (data.value.code === '0') {
          this.currentLoginUserData = data.value.data
          const token = useCookie('cake-token')
          token.value = data.value.data.token
          this.authenticated = true

          localStorage.setItem(
            'cake-customer-data',
            JSON.stringify({
              account: data.value.data.account,
              name: data.value.data.name,
              id: data.value.data.id,
            }),
          )

          ElMessage({
            message: '登入成功',
            type: 'success',
          })
        } else {
          throw new Error('登錄失敗')
        }
      } catch (error) {
        console.error('login error', error)
        ElMessage({
          message: '帳號或密碼錯誤',
          type: 'error',
        })
      }
    },
    logout() {
      const token = useCookie('cake-token')
      localStorage.removeItem('cake-customer-data')
      token.value = null
      this.currentLoginUserData = null
      this.authenticated = false
    },
    initialize() {
      const userData = localStorage.getItem('cake-customer-data')

      this.currentLoginUserData = userData ? JSON.parse(userData) : null

      const token = useCookie('cake-token')

      if (token.value) {
        this.authenticated = true
      } else {
        this.authenticated = false
      }
    },
    setCookie(name: any, value: any, days: any) {
      let expires = ''
      if (days) {
        let date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = '; expires=' + date.toUTCString()
      }
      document.cookie = name + '=' + (value || '') + expires + '; path=/'
    },
    setToken() {},
  },
})
