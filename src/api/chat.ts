// //发起对话
import http from './http'
import config from '@/assets/config'
import useConversationStore from '@/store/modules/conversation'
import type { additional } from '@/types/Chatmessages'
const { user_id, bot_id } = config

// 发起对话请求
export const Talk = async (additional_messages:additional[]) => {
  const ConversationStore = useConversationStore()
  const Obj = {
    method: 'post',
    path: 'v3/chat',
    data: {
      bot_id,
      user_id,
      stream: true,
      auto_save_history: true,
      additional_messages
    },
    // 注意判断是不是内联对话框要不要传id
    params: {
      conversation_id: ConversationStore.ConversationsId,
    },
  }
  // 返回给组件处理
  return http(Obj)

}

