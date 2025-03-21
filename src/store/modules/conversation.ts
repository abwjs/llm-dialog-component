import { defineStore } from 'pinia'
const useConversationStore = defineStore('conversation', {
  state:() =>{
    return {
      //会话列表
      Conversation_list: [
        {
          // 会话id1
          Conversation_id: '1',
          // 会话标题
          Conversation_title:'少时诵诗书生生世世',
          // 会话内容列表
          content: [],
          // 会话有无内容
          bol: true,
        },
        {
          // 会话id1
          Conversation_id: '2',
          // 会话标题
          Conversation_title:'JAVA是什么语言',
          // 会话内容列表
          content: [],
          // 会话有无内容
          bol: true,
        },
      ],
    }
  },
})
export default useConversationStore
