import { defineStore } from 'pinia'
import { CreateConversations, ViewMessageList } from '@/api/conversation'
import type { conversation } from '@/types/conversation'
interface conversationStore {
  dialog: boolean
  // 当前会话id
  ConversationsId: string
  //会话列表
  Conversation_list: conversation[]
}

const useConversationStore = defineStore('conversation', {
  state: (): conversationStore => {
    return {
      // 对话框组件显示与隐藏
      dialog: false,
      // 当前会话id
      ConversationsId: '',
      //会话列表
      Conversation_list: [],
    }
  },
  actions: {
    //进行一次对话
    setMessage() {},

    //改变当前id
    setConversationId(id: string) {
      this.ConversationsId = id
    },

    //当前的会话的列表
    GetConversation() {
      return this.Conversation_list.find((item) => item.Conversation_id === this.ConversationsId)
    },

    //获取当前的会话的信息列表
    GetContent() {
      // 更新当前会话的消息列表
      if (this.ConversationsId !== '') {
        ViewMessageList().then((res) => {
          const { data } = res

          this.Conversation_list.forEach((item) => {
            if (item.Conversation_id == this.ConversationsId) {
              item = data.map((item: { content: string; id: string; role: string }) => {
                const { content, id, role } = item
                return { id, role, value: content }
              })
            }
          })
        })
      }

      return this.GetConversation()?.content || []
    },
    //新建会话
    addConversation() {
      const res = CreateConversations()
      res.then(({ data }) => {
        this.Conversation_list.push({
          // 会话id
          Conversation_id: data.id,
          // 会话标题
          Conversation_title: '新建对话',
          // 会话内容列表
          content: [],
          // 时间
          createdAt: data.created_at,
        })
        this.ConversationsId = data.id
      })
    },
    //删除会话
    removeConversation(id: string) {
      //清空当前会话id
      this.ConversationsId = ''
      this.Conversation_list = this.Conversation_list.filter((item) => {
        return item.Conversation_id !== id
      })
    },
  },
  persist: true,
})
export default useConversationStore
