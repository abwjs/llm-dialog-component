// //发起对话
// import useConversationStore from '@/store/modules/conversation'
// import config from '@/assets/config'
// import type { body } from '@/types/dialogue'
// const conversation = useConversationStore()
// const { Conversation_id } = conversation
// const { apiKey } = config
// const Talk = async (body: body) => {
//   // 发起对话请求
//   try {
//     const response = await fetch(`https://api.coze.cn/v3/chat?conversation_id=${Conversation_id}`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//       // signal: controller.signal,
//     })

//     // 创建一个可读流
//     // const reader = response.body.getReader()
//     const decoder = new TextDecoder('utf-8')
//     while (true) {
//       const { done, value } = await reader.read()
//       if (done) {
//         console.log('结束读取')
//         break
//       }
//       // processChunk(decoder.decode(value, { stream: true }))
//       // 处理累积的消息内容
//     }
//   } catch (error) {
//     console.log(error);

//     // if (error.name === 'AbortError') {
//     //   console.log('Fetch aborted', '拦截请求')
//     // } else console.error('Error:', error)
//   }
// }
