import http from './http'
import config from '@/assets/config'
import useConversationStore from '@/store/modules/conversation'
interface messageList {
  bot_id: string
  page_num?: number
  page_size?: number
  sort_order?: 'ASC' | 'DESC'
}
const { bot_id } = config

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const params = <messageList>{
  bot_id,
}

//查看一个会话的消息列表
export const ViewMessageList = () => {
  const ConversationStore = useConversationStore()
  const obj = {
    method: 'post',
    path: 'v1/conversation/message/list',
    params: {
      conversation_id: ConversationStore.ConversationsId,
    },
  }
  http(obj).then((res) => {
    console.log(res)
  })
}

//创建会话
export const CreateConversations = async () => {
  const Obj = {
    method: 'post',
    path: 'v1/conversation/create',
  }
  return await http(Obj)
}
