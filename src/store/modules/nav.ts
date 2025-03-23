import { defineStore } from 'pinia'
const useNavStore = defineStore('nav', {
  state: () => {
    return {
      // 侧导航隐藏
      navbol: false,
      // 对话框组件显示与隐藏
      dialog:false
    }
  },
  actions: {},
  persist: true,
})
export default useNavStore
