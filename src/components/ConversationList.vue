<!-- 一个会话的组件 -->
<template>
  <div
    class="Box"
    :class="{ active: Conversation.Conversation_id === conversationStore.ConversationsId }"
  >
    <div ref="SetInput" class="SetInput" v-if="SetTitleBol">
      <input type="text" autofocus v-model="Conversation.Conversation_title">
    </div>
    <!-- 会话内容 -->
    <div class="CList" v-else
    @click="ActiveFn"

    >
      <!-- 会话标题 -->
      <div class="text">
        <h2>{{ Conversation.Conversation_title }}</h2>
      </div>
      <!-- ... -->
      <div class="more" @click.stop="show">
        <el-icon>
          <MoreFilled />
        </el-icon>
      </div>
      <!-- 不触摸时模糊 -->
      <div class="fuzzy1"></div>
      <!-- 触摸模糊 -->
      <div class="fuzzy2"></div>
    </div>
    <!-- 弹出框 -->
    <div class="Popup" @click.stop v-if="Popupbol" ref="popupRef">
      <li @click="getName">
        <el-icon>
          <EditPen size="20px" />
        </el-icon>
        <span>重命名</span>
      </li>
      <li @click="removecoverstaion">
        <el-icon>
          <Delete size="20px" color="#ff4d4f" />
        </el-icon>
        <span>删除</span>
      </li>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick, defineProps, watch } from 'vue'
import useConversationStore from '../store/modules/conversation'
import useNavStore from '../store/modules/nav'
const conversationStore = useConversationStore()
const NavStore = useNavStore()
const props = defineProps(['Conversation'])
const Conversation = props.Conversation
// 当前会话的id
const id = Conversation.Conversation_id
const SetInput = ref<HTMLElement| null>(null)
// 控制弹出框是否弹出
const Popupbol = ref<boolean>(false)
// 获取弹出框元素
const popupRef = ref<HTMLElement | null>(null)
//控制是否显示修改标题框
const SetTitleBol = ref<boolean>(false)
// 点击弹出框外面就隐藏弹出框
const handleClickOutside = (e: Event) => {
  if (!popupRef.value || !popupRef.value.contains(e.target as Node)) {
    Popupbol.value = false
    document.removeEventListener('click', handleClickOutside)
  }
}


// 点击...显示弹出框
const show = () => {
  // 改变控制弹出框变量
  Popupbol.value = !Popupbol.value
  NavStore.id = id
  if (Popupbol.value) {
    // 使用 setTimeout 确保弹出框已渲染
    nextTick(() => {
      document.addEventListener('click', handleClickOutside)
    })
  } else {
    // 卸载document点击事件监听
    document.removeEventListener('click', handleClickOutside)
  }
}

//点击该会话后处理操作
const ActiveFn = () => {
  if(conversationStore.ConversationsId===id)return
  NavStore.navbol = false
  // 改变当前会话id
  conversationStore.setConversationId(id)
  // 获取当前会话消息
  conversationStore.GetConversation()
}

// 组件卸载前移除监听
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

//删除会话
const removecoverstaion = () => {
  // 删除会话函数
  conversationStore.removeConversation(id)
  // 改变当前会话
  conversationStore.GetConversation()
}

const handleClickOutside2 = (e:Event)=>{
  if (!SetInput.value || !SetInput.value.contains(e.target as Node)) {
   SetTitleBol.value = false
    document.removeEventListener('click', handleClickOutside2)
  }
}

// 改会话标题
const getName = () => {


  // 关闭弹出框
  NavStore.id = ''
  // 显示修改标题框
  SetTitleBol.value = true
  if (SetTitleBol.value) {
    // 使用 setTimeout 确保弹出框已渲染
    nextTick(() => {
      document.addEventListener('click', handleClickOutside2)
    })
  } else {
    // 卸载document点击事件监听
    document.removeEventListener('click', handleClickOutside2)
  }
}

// 监听弹出框的id，判断是否点击到了别的会话标题
watch(
  () => NavStore.id,
  (newValue) => {
    if (newValue !== id) {
      Popupbol.value = false
    }
  },
)
</script>

<style scoped lang="scss">

// 会话列表
.Box {
  position: relative;
  margin: 10px 0;

  //弹出框
  .Popup {
    display: flex;
    z-index: 99;
    flex-direction: column;
    padding: 3px;
    position: absolute;
    width: 120px;
    height: 80px;
    bottom: -80px;
    right: 0px;
    transition: all 0.1s;
    box-shadow: 0 0 5px rgba(30, 30, 30, 0.1);
    border-radius: 15px;
    background-color: var(--bg-color);

    //弹出框的两个选项
    li {
      border-radius: 15px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      flex: 1;
      width: 100%;
      transition: all 0.1s;
      cursor: pointer;

      span {
        margin-left: 25px;
      }

      &:hover {
        background-color: rgba(219, 234, 254);
      }

      // 删除选项
      &:nth-child(2) {
        color: #ff4d4f;

        &:hover {
          background-color: rgba(245, 139, 139, 0.7);
        }
      }
    }
  }
  //修改标题框
  .SetInput {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: 15px;
    width: 100%;
    height: 40px;
    padding: 10px;
    cursor: pointer;
    border-radius: 15px;
    border: 3px solid rgba(219, 234, 254);
    input {
      max-width: 100%;
      font-size: 15px;
      background-color: var(--nav-bg-color);
    }
  }

  // 会话内容
  .CList {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-radius: 15px;
    width: 100%;
    height: 40px;
    transition: all 0.1s;
    padding: 10px;
    cursor: pointer;

    //...
    .more {
      opacity: 0;
      display: flex;
      right: 10px;
      position: absolute;
      height: 23px;
      width: 23px;
      cursor: pointer;
      border-radius: 10px;
      align-items: center;
      justify-content: center;
      z-index: 9;
      background-color: rgba(219, 234, 254);

      &:hover {
        background-color: #fffffff5;
      }
    }

    //标题
    .text {
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    // 模糊
    .fuzzy1 {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      width: 150px;
      height: 100%;
      background: linear-gradient(90deg, rgba(249, 251, 255, 0) 50%, var(--nav-bg-color) 100%);
    }

    .fuzzy2 {
      opacity: 0;
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      width: 120px;
      height: 100%;
      background: linear-gradient(90deg, rgba(249, 251, 255, 0) 0%, rgba(219, 234, 254) 100%);
    }

    &:hover {
      background-color: rgba(225, 235, 248, 0.8);

      .fuzzy1 {
        opacity: 0;
      }

      // 当鼠标碰到会话列表时显示模糊
      .fuzzy2 {
        opacity: 1;
        background: linear-gradient(
          90deg,
          rgba(249, 251, 255, 0) 0%,
          rgba(225, 235, 248, 0.8) 100%
        );
      }

      // 当鼠标碰到会话列表时显示 ...
      .more {
        background-color: rgba(225, 235, 248, 0.8);
        opacity: 1;
        &:hover {
          background-color: #fff;
        }
      }
    }
  }
}

/* 点击后样式 */
.active {
  .CList {
    background-color: rgba(219, 234, 254);
    &:hover {
      background-color: rgba(219, 234, 254);
    }
    .fuzzy1 {
      opacity: 0;
    }

    .fuzzy2 {
      opacity: 1;
    }

    .more {
      opacity: 1;
    }
  }
}
</style>
