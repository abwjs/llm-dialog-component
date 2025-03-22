//消息用户还是ai
enum ContentType {
  user = "user",
  assistant = "assistant",
}
interface Content {
  role:ContentType

}
//会话的类型
export interface conversation {
  // 会话id
  id:string,
  // 会话标题
  name:string
  //内容
  content:Content
}
