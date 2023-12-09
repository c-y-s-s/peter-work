// stores/navigation.js
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    navigatedInApp: false,
  }),
  actions: {
    setNavigatedInApp(value: any) {
      this.navigatedInApp = value
    },
  },
})
