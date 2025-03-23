import { defineStore } from 'pinia'
import { CreateConversations } from '@/api/conversation'
const useConversationStore = defineStore('conversation', {
  state: () => {
    return {
      // 对话框组件显示与隐藏
      dialog: false,
      // 当前会话id
      ConversationsId: '1',
      //会话列表
      Conversation_list: [
        {
          // 会话id
          Conversation_id: '1',
          // 会话标题
          Conversation_title: '',
          // 会话内容列表
          content: [],
          // 时间
          createdAt: Date.now(),
        },
      ],
    }
  },
  actions: {
    //查看会话列表
    GetConversation() {
      return this.Conversation_list.find((item) => item.Conversation_id === this.ConversationsId)
    },
    // 创建会话
    timestampToDate(timestamp: number) {
      const Date1 = new Date()
      const date = new Date(timestamp)
      const Y = Date1.getFullYear() - date.getFullYear()
      if (Y > 1) return '1年前'
      const M = Date1.getMonth() - date.getMonth()
      if (M > 1) return '1年内'
      const D = Date1.getDate() - date.getDate()
      if(D>30)return '30天内'
      switch (D) {
        case 1:
          return '昨天'
        case 0:
          return '今天'
        default:
          return '7天内'
      }
    },
    addConversation() {
      const res = CreateConversations()
      res.then(({ data }) => {
        console.log(data)

        this.ConversationsId = data.id
        created_at
      })

      // const {
      //   Conversation_id,
      //   Conversation_titles,
      //   content,
      // } = obj
    },
  },
  persist: true,
})
export default useConversationStore
