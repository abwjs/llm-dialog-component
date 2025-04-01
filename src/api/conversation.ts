import http from './http'
import useConversationStore from '@/store/modules/conversation'


//查看当前会话的消息列表
export const ViewMessageList = async() => {
  const ConversationStore = useConversationStore()
  const obj = {
    method: 'post',
    path: 'v1/conversation/message/list',
    params: {
      conversation_id: ConversationStore.ConversationsId,
    },
  }
  return http(obj)
}

//创建会话
export const CreateConversations = async () => {
  const Obj = {
    method: 'post',
    path: 'v1/conversation/create',
  }
  return await http(Obj)
}
