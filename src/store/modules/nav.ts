import { defineStore } from 'pinia'
const useNavStore = defineStore('nav', {
  state: () => {
    return {
      // 侧导航隐藏
      navbol: false,
    }
  },
  actions: {},
})
export default useNavStore
