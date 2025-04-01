<template>
  <div class="Box">
    <!-- 侧边导航栏占位 -->
    <OffCanvas class="Offcanvas"></OffCanvas>
    <main class="main">
      <!-- 遮罩层 -->
      <div class="MaskLayer" v-if="NavStore.navbol" @click="Scale"></div>
      <div class="nav">
        <!-- 侧边框按钮 -->
        <button class="headerbt" v-if="!NavStore.navbol" @click="Scale"></button>
        <!-- 问题标题 -->
        <h2 v-if="true">{{ MessageTitle }}</h2>
        <!-- 返回按钮 -->
        <router-link to="/" class="active"></router-link>
      </div>
      <!-- 没有消息时显示的组件 -->
      <div class="Form1 Form" v-if="ContentList.length === 0">
        <div class="word">
          <!-- logo占位 -->
          <h2>我是OmniChat，开始对话吧</h2>
          <p>有什么可以帮你的？</p>
        </div>
        <!-- 对话框组件 -->
        <DialogBox @sending="sending"></DialogBox>
      </div>
      <!-- 有消息时显示的组件 -->
      <div class="Form2 Form" v-else>
        <!-- 消息列表组件 -->
        <ChatContent v-if="ContentList.length > 0" :ContentList="ContentList"></ChatContent>
        <!-- 对话框组件 -->
        <DialogBox @sending="sending"></DialogBox>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// 侧边导航栏组件
import OffCanvas from '@/components/OffCanvas.vue'
// 对话框组件
import DialogBox from '../components/DialogBox.vue'
// 消息列表组件
import ChatContent from '../components/ChatContent.vue'
import useNavStore from '../store/modules/nav'
import useConversationStore from '../store/modules/conversation'
import { Talk } from '../api/chat'
import { onMounted, ref, watch } from 'vue'
import type { Content } from '../types/conversation'
import { additional } from '../types/Chatmessages'
const Conversation = useConversationStore()

const MessageTitle = ref('')
const NavStore = useNavStore()
const ContentList = ref<Content[]>([])

// 修改导航栏隐藏显示
const Scale = () => {
  NavStore.$patch((store) => {
    store.navbol = !store.navbol
  })
}

// 接收内容
const fullContent = ref<string>('')
watch(fullContent,(newValue)=>{
  if(newValue!=''){
  ContentList.value[ContentList.value.length-1].value = newValue
}})
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
const sending = async (value: string) => {
  fullContent.value = ''
  // 判断当前为点击创建对话的页面
  if (Conversation.ConversationsId === '') {
    //创建会话
    Conversation.addConversation()
  }
  //发起对话附加消息参数
  const additional_messages: additional[] = [
    {
      role: 'user',
      content: value,
      content_type: 'text',
    },
  ]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const HTTP = Talk(additional_messages) as any
  HTTP.then(async (res) => {
    // 创建一个可读流
    const reader = res.body.getReader()
    const decoder = new TextDecoder('utf-8')
    ContentList.value.push({
      role:'assistant',
      value:fullContent.value,
      id:'1'
    })
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

  const obj = {
    role: 'user',
    value,
    id: '1',
  }
  //添加用户消息
  ContentList.value.push(obj as Content)
}

// 改变当前消息列表内容
const GetContentList = () => {
  const { GetContent } = Conversation
  //获取消息列表
  ContentList.value = GetContent()
}

//对当前id进行监听改变当前的显示模式
watch(
  () => Conversation.ConversationsId,
  (newValue, oldValue) => {
    // 判断是不是新建的会话
    if (oldValue !== '') {
      GetContentList()
    }
  },
)

onMounted(() => {
  //获取消息列表
  GetContentList()
  // 有消息才获取标题
  if (!ContentList.value) {
    //获取标题
    MessageTitle.value = Conversation.GetConversation().Conversation_title
  }
})
</script>

<style scoped lang="scss">
.Box {
  display: flex;
  max-height: 100vh;
  overflow: hidden;

  .main {
    padding: 0 10px;
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--bg-color);
    height: 100vh;

    // 遮罩层
    .MaskLayer {
      display: none;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    //头部导航
    .nav {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: end;
      width: 100%;
      height: 64px;

      h2 {
        position: absolute;
        left: 50%;
        top: 50%;
        font-weight: 600;
        font-size: 20px;
        transform: translate(-50%, -50%);
      }

      //返回按钮
      .active {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background-color: rgb(230, 230, 230);
        transition: all 0.3s;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
      }

      //侧边栏按钮
      .headerbt {
        display: none;
        width: 36px;
        height: 36px;
        border-radius: 10px;
        background-color: rgb(230, 230, 230);
        transition: all 0.3s;
        cursor: pointer;
        border: 0;

        &:hover {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }
      }
    }

    // 内容的通用样式
    .Form {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    // 会话没有消息的样式
    .Form1 {
      width: 60%;
      margin-top: -64px;

      .word {
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
          font-weight: 500;
          font-size: 24px;
        }

        p {
          margin: 25px 0;
          font-size: 16px;
          opacity: 0.5;
          color: rgb(71, 85, 105);
        }
      }
    }

    //会话有消息的样式
    .Form2 {
      padding-top: 30px;
      width: 100%;
      max-width: 750px;
      position: relative;
      overflow-y: auto;
    }
  }
}

//移动端适配
@media (max-width: 768px) {
  .Box {
    .main {
      //遮罩层

      .MaskLayer {
        display: block;
      }

      // 头部导航
      .nav {
        justify-content: space-between;

        .headerbt {
          display: block !important;
        }
      }

      .Form {
        width: 100%;
      }
    }
  }
}
</style>
