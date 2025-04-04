import { defineStore } from 'pinia'
import { CreateConversations, ViewMessageList } from '@/api/conversation'
import type { Content, conversation } from '@/types/conversation'

const useConversationStore = defineStore('conversation', {
  state: () => {
    return {
      // 对话框组件显示与隐藏
      dialog: false,
      // 当前会话id
      ConversationsId: '',
      //会话列表
      Conversation_list: [] as conversation[],
      //当前会话消息列表
      ContentList: [] as Content[],
    }
  },
  getters: {
    //当前会话标题
    ConversationTitle(state) {
      return state.Conversation_list.find((item) => item.Conversation_id == this.ConversationsId)?.Conversation_title
    },
  },
  actions: {
    // 增加用户消息
    setUserMessage(content: string) {
      this.ContentList.push({
        role: 'user',
        content,
        id: '1',
      })
    },
    // 初始化ai消息占位
    setAIMessage() {
      this.ContentList.push({
        role: 'assistant',
        content: '',
        id: '1',
      })
    },
    // 流式增加ai消息
    setAIStream(chunk: string) {
      const content = this.ContentList[this.ContentList.length-1] as Content
      content.content += chunk
    },
    //进行一次对话
    setMessage() {},

    //改变当前id
    setConversationId(id: string) {
      this.ConversationsId = id
    },

    //当前的会话的列表
    GetConversation() {
      return this.Conversation_list.find((item) => item.Conversation_id == this.ConversationsId)
    },

    //获取当前的会话的信息列表
    async GetContent() {

      if(!this.ConversationsId) {
        this.ContentList = []
        return
      }
      //调用获取消息列表api
      try {
      const {data} =   await ViewMessageList(this.ConversationsId)
      data.reverse()

      this.ContentList = data.map(({id,role,content}:Content)=>{
        return {
          id,
          content,
          role
        }
      })}catch(err){
        console.log(err);
      }
    },


    //修改会话标题
    setConversationTitle(Conversation_title: string, Conversation_id: string) {
      const conversation = this.Conversation_list.find(item=>item.Conversation_id == Conversation_id) as conversation
      conversation.Conversation_title = Conversation_title
    },

    //新建会话
    async addConversation() {
      const { data } = await CreateConversations()
      this.Conversation_list.push({
        // 会话id
        Conversation_id: data.id,
        // 会话标题
        Conversation_title: '新建对话',
        // 时间
        createdAt: data.created_at,
      })
      this.ConversationsId = data.id
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
