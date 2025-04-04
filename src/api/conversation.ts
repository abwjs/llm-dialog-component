import http from './http'

//查看当前会话的消息列表
export const ViewMessageList = async (conversation_id: string) => {
  const obj = {
    method: 'post',
    path: 'v1/conversation/message/list',
    params: {
      conversation_id,
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
