<template>
  <div class="DialogBox">
    <div class="Dialog">
      <!-- 文件预览 -->
      <div class="Preview" :class="{ PreviewAction: FileArr.length !== 0 }">
        <!-- 文件组件 -->
        <div class="file" v-for="item in FileArr" :key="item.id">
          <div class="btn-remove" @click="removeFile(item.id)">
            <el-icon :size="15">
              <CloseBold />
            </el-icon>
          </div>
          <!-- 文件图标 -->
          <img src="../assets/img/logo.png" alt="" />
          <div class="content">
            <!-- 文件名字 -->
            <h2>{{ item.title }}</h2>
            <!-- 文件格式大小 -->
            <p>{{ item.fileobj }} {{ item.D }}</p>
          </div>
        </div>
      </div>
      <div class="Textarea">
        <!-- 文本输入 -->
        <el-input
          v-model="text"
          style="width: 100%"
          :autosize="{ minRows: 3, maxRows: 10 }"
          type="textarea"
          resize="none"
          placeholder="输入消息，Enter 发送，Shift + Enter 换行"
        />
        <div class="postBox">
          <!-- 文件上传 -->
          <div class="Link">
            <el-icon :size="20"><Paperclip /></el-icon>
          </div>
          <!-- 图片上传 -->
          <div class="i">
            <el-icon :size="20"><Paperclip /></el-icon>
          </div>
          <!-- 发送消息 -->
          <button class="post" @click="sending"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { additional } from '../types/Chatmessages'
import { Talk } from '../api/chat'
import { storeToRefs } from 'pinia'
import useConversationStore from '../store/modules/conversation'

const ConversationStore = useConversationStore()

const {  ConversationsId } = storeToRefs(ConversationStore)

const text = ref<string>('')
// 模拟数据
const FileArr = ref([
  {
    id: '1',
    title: '我不是文件我不是文件我不是文件我不是文件',
    fileobj: 'HTML',
    // 文件大小
    D: '100MB',
  },
])

const removeFile = (id: string) => {
  FileArr.value = FileArr.value.filter((item) => {
    return item.id !== id
  })
}

// 接收内容
const fullContent = ref<string>('')

//buffer
const buffer = ref<string>('')
//对话id
const chat_id = ref<string>('')
// 处理流式输出提取内容函数（使用buffer处理不完整行）

const processChunk = (chunk: string) => {
  buffer.value += chunk
  const lines = buffer.value.split('\n')
  // 保留未处理完的部分
  buffer.value = lines.pop() || ''
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line.startsWith('event:conversation.chat.created')) {
      //找data的那一行
      const dataLine = lines[i + 1].trim()
      //去data
      const dataStr = dataLine.slice(5).trim()
      try {
        const data = JSON.parse(dataStr)
        chat_id.value = data.id
      } catch (error) {
        console.error('拿取chatid失败', error)
      }
    }
    if (line.startsWith('event:conversation.message.delta') && i + 1 < lines.length) {
      const dataLine = lines[i + 1].trim()
      if (dataLine.startsWith('data:')) {
        const dataStr = dataLine.slice(5).trim()
        try {
          const data = JSON.parse(dataStr)

          if (data.type === 'answer') {
            fullContent.value += data.content
            ConversationStore.setAIStream(data.content)
          }
        } catch (error) {
          console.error('解析 JSON 失败:', error)
        }
        i++ // 跳过已处理的 data 行
      }
    }
  }
}

//对话框发送对话
const sending = async () => {
  if(text.value == ''){
    console.log('模拟无消息提示框');
  }
  fullContent.value = ''
  // 判断当前为点击创建对话的页面
  if (ConversationsId.value === '') {
    //创建会话
    await ConversationStore.addConversation()
  }

  //发起对话消息
  const additional_messages: additional[] = [
    {
      role: 'user',
      content: text.value,
      content_type: 'text',
    },
  ]
  const HTTP = Talk(additional_messages)
  HTTP.then(async (res) => {

    // 创建一个可读流
    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')
    //增加用户消息
    ConversationStore.setUserMessage(text.value)
    // 增加ai消息占位
    ConversationStore.setAIMessage()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        console.log('结束读取')
        break
      }
      processChunk(decoder.decode(value, { stream: true }))
      // 处理累积的消息内容
    }
  }).catch((err) => {
    console.log(err)
  })
}



</script>

<style scoped lang="scss">
// 对话框容器
.DialogBox {
  position: relative;
  padding: 15px 0;
  padding-bottom: 20px;
  background-color: #fff;
  min-height: 130px;
  display: flex;
  width: 100%;

  .Dialog {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;
    border-radius: 30px;
    border: 0.5px solid rgba(219, 234, 254);
    box-shadow: 0 0 5px rgba(25, 25, 25, 0.2);

    // 当有文件上传时
    .PreviewAction {
      padding: 10px;
    }

    //文件预览 网格布局
    .Preview {
      width: 100%;
      max-height: 180px;
      flex: 1;
      overflow-y: auto;
      display: grid;
      flex-wrap: wrap;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;

      .file {
        position: relative;
        cursor: pointer;
        border-radius: 15px;
        height: 52px;
        background-color: rgb(243, 244, 246);
        transition: all 0.3s;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        padding: 5px 10px;
        min-width: 0;

        &:hover {
          box-shadow: 0 5px 15px rgb(219, 220, 222);

          .btn-remove {
            display: flex;
          }
        }

        //删除图标
        .btn-remove {
          display: none;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          position: absolute;
          justify-content: center;
          align-items: center;
          right: 5px;
          top: 5px;
          transition: all 0.1s;

          &:hover {
            background-color: rgb(71, 85, 105);
            color: rgb(243, 244, 246);
          }
        }

        // 文件的图标
        img {
          margin-right: 15px;
          width: 30px;
          height: 30px;
        }

        // 文件的文字内容
        .content {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          h2 {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          p {
            font-size: 12px;
            opacity: 0.8;
            color: rgb(71, 85, 105);
          }
        }
      }
    }

    .Textarea {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: rgb(243, 244, 246);
      border: 0.5px solid rgba(219, 234, 254);
      border-radius: 20px;
      width: 100%;
      padding: 6px;

      //输入框自定义样式s
      :deep(.el-textarea__inner) {
        border: none;
        background-color: rgb(243, 244, 246);
        box-shadow: none;
        font-size: 16px;
        border: 0;

        &:focus {
          box-shadow: none;
        }
      }

      .postBox {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        gap: 15px;
        .Link,
        .i {
          width: 28px;
          height: 28px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.1s;
          &:hover {
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
        .post {
          right: 10px;
          bottom: 30px;
          cursor: pointer;
          width: 25px;
          height: 25px;
          border-radius: 5px;
          border: 0;
          box-shadow: 0 0 10px rgba(25, 25, 25, 0.2);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .DialogBox {
    width: 100%;
    max-width: 100%;

    .Dialog {
      .Preview {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
</style>
