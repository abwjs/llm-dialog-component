interface auto_save_history {
  role: string
  type?: string
  content?: string
  content_type?: string
  meta_data?: string
}

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
  additional_messages?: auto_save_history
}

//返回的可读流类型
// export interface response {}
