import http from "./http"
import config from '@/assets/config'
interface messageList {
  bot_id:string
  page_num?:number
  page_size?:number
  sort_order?:'ASC'|'DESC'
}
const {bot_id} =config

//查看会话列表
const params = <messageList>{
  bot_id
}



//创建会话
export const CreateConversations = ()=>{
  const data = {
    messages:[
      {
        role:'user',
        content:'js是什么',
        content_type:'text'

      }
    ]
  }
  const Obj = {
    method:'post',
    path:'v1/conversation/create',
    data,
  }
  http(Obj).then(res=>{
    console.log(res);
    const obj = {
      path:'v1/conversation/retrieve',
      method:'get',
      params:{conversation_id:res.data.id}
    }
    http(obj).then(res=>{
      console.log(res);

    })
    const o = {
      path:'v1/conversation/message/create',
      method:'post',
      params: {
        conversation_id:res.data.id
      },
      data: {
        role:'user',
        content:'js是什么',
        content_type:'text'
      }
    }
    http(o).then(res=>{
      console.log(res);

    })
  })
}
