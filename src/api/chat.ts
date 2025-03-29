// //发起对话
import http from './http'
import config from '@/assets/config'
import useConversationStore from '@/store/modules/conversation'
import type { additional } from '@/types/Chatmessages'
const { user_id, bot_id } = config
const ConversationStore = useConversationStore()
type additionalStr = additional[]
// 发起对话请求
export const Talk = async (additional_messages: additionalStr) => {
  const Obj = {
    method: 'post',
    path: 'v3/chat',
    data: {
      bot_id,
      user_id,
      stream: true,
      auto_save_history: true,
      // 发送的内容
      additional_messages,
    },
    // 注意判断是不是内联对话框要不要传id
    params: {
      conversation_id: ConversationStore.ConversationsId,
    },
  }
  // 返回给组件处理
  return http(Obj)
}

const controller = new AbortController()
//取消对话
// chat_id是对话id
export const CancelTalk = (chat_id: string) => {
  controller.abort()
  const obj = {
    method: 'post',
    path: '/v3/chat/cancel',
    data: {
      chat_id,
      conversation_id: ConversationStore.ConversationsId,
    },
  }
  http(obj)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
