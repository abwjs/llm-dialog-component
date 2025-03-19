// 发起对话的body类型
export interface body {
  // 智能体bot
  bot_id: string
  //用户id
  user_id: string
  //流式对话
  stream?: boolean
  // 保持该对话
  auto_save_history?: boolean
  // 附加消息
  // additional_messages?:
}

//返回的可读流类型
// export interface response {}
