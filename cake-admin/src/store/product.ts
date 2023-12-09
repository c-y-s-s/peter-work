import { defineStore } from 'pinia'
import { postCreateProductApi } from '~/server/apis/product'

export const useProductStore = defineStore('product', {
  state: (): any => ({}),
  getters: {},
  actions: {
    async usePostCreateProductQuery(formData: any) {
      let { resData }: any = await postCreateProductApi(formData)
    },
  },
})
