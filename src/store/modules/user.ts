// src/store/modules/user.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
  const userInfo = ref({})
  const loginStatus = ref(false)
  const token = ref('')
  /**
   * 登录
   */
  function handleLogin() {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.8) {
        loginStatus.value = true
        token.value = String(new Date().getTime())
        userInfo.value = {
          name: 'admin',
          avatar:
            'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
        }
        resolve('登录成功')
      } else {
        reject('登录失败')
      }
    })
  }

  /**
   * 退出登录
   */
  function handleLogout() {
    return new Promise<void>((resolve) => {
      loginStatus.value = false
      token.value = ''
      userInfo.value = {}
      resolve()
    })
  }

  return {
    userInfo,
    loginStatus,
    token,
    handleLogin,
    handleLogout,
  }
})

export default useUserStore
