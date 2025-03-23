// //发起对话
import http from './http'
import config from '@/assets/config'
import type { body } from '@/types/dialogue'
const { user_id, bot_id } = config
import {CreateConversations} from './conversation';

// 处理流式输出提取内容函数（使用buffer处理不完整行）
let fullContent = ''
let buffer = ''
let chat_id = ''
const processChunk = (chunk:any) => {
  buffer += chunk;
  const lines = buffer.split("\n");
  // 保留未处理完的部分
  buffer = lines.pop() || "";
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith("event:conversation.chat.created")) {
      //找data的那一行
      const dataLine = lines[i + 1].trim();
      //去data
      const dataStr = dataLine.slice(5).trim();
      try {
        const data = JSON.parse(dataStr);
        chat_id = data.id
        console.log(chat_id);
      } catch (error) {
        console.error("拿取chatid失败", error);
      }
    }
    if (line.startsWith("event:conversation.message.delta") && i + 1 < lines.length) {
      const dataLine = lines[i + 1].trim();
      if (dataLine.startsWith("data:")) {
        const dataStr = dataLine.slice(5).trim();
        try {
          const data = JSON.parse(dataStr);
          if (data.type === "answer") {
            fullContent += data.content;
          }
        } catch (error) {
          console.error("解析 JSON 失败:", error);
        }
        i++; // 跳过已处理的 data 行
      }
    }
  }
};

// 发起对话请求
const Talk = async () => {
  const Obj = {
    method: 'post',
    path: 'v3/chat',
    data: {
      bot_id,
      user_id,
      stream: true,
      auto_save_history: true,
      additional_messages: [
        {
          role: 'user',
          content: '回复我一个字',
          content_type:'text'
        },
      ],
    },
  }
  http(Obj)
    .then(async (res) => {

      // 创建一个可读流
    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        console.log('结束读取');
        break;
      }
      processChunk(decoder.decode(value, { stream: true }));
      // 处理累积的消息内容
    }
    })
    .catch((err) => {
      console.log(err)
    })
}

export default Talk
