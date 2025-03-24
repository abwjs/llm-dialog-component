import type { FileObject } from "@coze/api/."


//会话的类型
export interface conversation {
  // 会话id
  Conversation_id: string,
  // 会话标题
  Conversation_title:  string,
  // 会话内容列表
  content: Content[]
  // 时间
  createdAt:Date,
}
//消息列表的内容
export interface Content {
  id: string
  role: 'assistant' | 'user'
  value: string
  fileInfo?: FileObject
}
