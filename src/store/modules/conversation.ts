import { defineStore } from 'pinia'
const useConversationStore = defineStore('conversation', {
  state() {
    return {
      // 会话id
      Conversation_id:'',
      //会话列表
      Conversation_list:[
        {
          // 会话id1
          Conversation_id:'1',
          // 会话内容列表
          content:[],
        }
      ],

    }
  },
})
export default useConversationStore
