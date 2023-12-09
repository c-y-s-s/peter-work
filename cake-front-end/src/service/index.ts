import type { UseFetchOptions } from 'nuxt/app'
import { useAuthStore } from '~/store/login'
import { nextTick } from 'vue'
type Methods = 'GET' | 'POST' | 'DELETE' | 'PUT'

const BASE_URL = 'http://localhost:3002'

export interface IResultData<T> {
  code: number
  data: T
  msg: string
}

class HttpRequest {
  request<T = any>(
    url: string,
    method: Methods,
    data: any,
    options?: UseFetchOptions<T>,
  ) {
    return new Promise((resolve, reject) => {
      const newOptions: UseFetchOptions<T> = {
        baseURL: BASE_URL,
        method: method,
        ...options,
        onRequest: ({ request, options }) => {
          // 设置请求头等
          this.onRequest({ request, options })
        },
        onRequestError: ({ request, options, error }) => {
          // 处理请求错误
          this.onRequestError({ request, options, error })
        },
        onResponse: ({ request, response, options }) => {
          if (response._data.code === '-1') {
            reject(response._data)
          }

          // token 過期
          if (response.status === 401 || response._data.code === '999') {
            navigateTo('/login')
            useAuthStore().setCookie('cake-token', '', -1)
            useAuthStore().isToken = false
            useAuthStore().logout()
            reject(response._data)
          }
          // 处理响应数据
          this.onResponse({ request, response, options })
        },
        onResponseError: ({ request, response, options }) => {
          // 处理响应错误
          this.onResponseError({ request, response, options })
        },
      }

      if (method === 'GET' || method === 'DELETE') {
        newOptions.params = data
      }
      if (method === 'POST' || method === 'PUT') {
        newOptions.body = data
      }

      useFetch(url, newOptions)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  onRequest({ request, options }: any) {
    // 直接从 cookie 中获取 token
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('cake-token='))
    const tokenValue = token ? token.split('=')[1] : null

    options.headers = options.headers || {}
    options.headers.authorization = `Bearer ${tokenValue}`
  }

  onRequestError({ request, options, error }: any) {
    // 请求错误处理
  }

  onResponse({ request, response, options }: any) {
    // 响应处理

    if (response.headers.get('Authorization')) {
      useAuthStore().setCookie(
        'cake-token',
        response.headers.get('Authorization'),
        1,
      )
    }
  }

  onResponseError({ request, response, options }: any) {
    // 响应错误处理
  }
  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request(url, 'GET', params, options)
  }

  post<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request(url, 'POST', data, options)
  }

  Put<T = any>(url: string, data: any, options?: UseFetchOptions<T>) {
    return this.request(url, 'PUT', data, options)
  }

  Delete<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request(url, 'DELETE', params, options)
  }
}

const httpRequest = new HttpRequest()

export default httpRequest
