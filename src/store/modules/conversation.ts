import { defineStore } from 'pinia'
const useConversationStore = defineStore('conversation', {
  state: () => {
    return {
      // 当前会话id
      ConversationsId:'',
      //会话列表
      Conversation_list: [
        {
          // 会话id
          Conversation_id: '1',
          // 会话标题
          Conversation_title: '少时诵诗书生生世世',
          // 会话内容列表
          content: [],
        },
        {
          // 会话id1
          Conversation_id: '2',
          // 会话标题
          Conversation_title: 'JAVA是什么语言',
          // 会话内容列表
          content: [],
        },
      ],
    }
  },
  actions: {
    //查看会话列表
    ViewConversation(){
    },
    // 创建会话
    addConversation() {

    }
  }
})
export default useConversationStore
