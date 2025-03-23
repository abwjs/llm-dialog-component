import http from "./http"
import config from '@/assets/config'
import useConversationStore from "@/store/modules/conversation"
import Talk from "./char"
interface messageList {
  bot_id:string
  page_num?:number
  page_size?:number
  sort_order?:'ASC'|'DESC'
}
const {bot_id} =config

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const params = <messageList>{
  bot_id
}

//查看会话列表
export const ViewMessageList = ()=>{
const ConversationStore = useConversationStore()

  const obj = {
    method:'post',
    path:'v1/conversation/message/list',
    params: {
      conversation_id:ConversationStore.ConversationsId
    }
  }
  http(obj).then(res=>{
    console.log(res);

  })
}



//创建会话
export const CreateConversations = ()=>{
  const ConversationStore = useConversationStore()

  const Obj = {
    method:'post',
    path:'v1/conversation/create',
  }
  http(Obj).then(res=>{
    console.log(res.data.id);
    ConversationStore.ConversationsId = res.data.id
    Talk()
  })
}
