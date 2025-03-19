<!-- 侧边导航栏 -->
<template>
  <div :class="{ open: NavStore.navbol, scale: !NavStore.navbol }" class="nav" ref="nav">
    <div class="header">
      <h2 v-if="NavStore.navbol">OmniChat</h2>
      <!-- 切换按钮占位 -->
      <button class="bt" @click="Scale"></button>
    </div>
    <div v-if="NavStore.navbol" class="Conversation">
      <!-- 新建对话按钮 -->
      <button class="Newconversation">
        <el-icon color="#409efc" size="20px">
          <ChatLineRound />
        </el-icon>
        <span>创建新对话</span>
      </button>
      <div class="content">
        <ConversationList></ConversationList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConversationList from '@/components/ConversationList.vue'
import useNavStore from '../store/modules/nav'
const NavStore = useNavStore()
const nav = ref()
const Scale = () => {
  NavStore.navbol = !NavStore.navbol
}
</script>

<style scoped lang="scss">
// 缩放样式
.scale {
  width: 60px;
  display: flex;
  flex-direction: row !important;
  justify-content: center;
}

// 打开样式
.open {
  height: 100vh;
  background-color: var(--nav-bg-color);
  width: 260px;

  .header {
    justify-content: space-between;

    h2 {
      font-size: 24px;
      font-weight: 600;
    }
  }
}

.nav {
  height: 100vh;
  background-color: var(--nav-bg-color);
  display: flex;
  flex-direction: column;
  transition: all 0.1s;
  .Conversation {
    flex: 1;
    padding: 20px;
    .Newconversation {
      margin-bottom: 20px;
      border: 0;
      border-radius: 20px;
      width: 151px;
      height: 44px;
      background-color: rgb(219, 234, 254);
      transition: all 0.3s;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      font-size: 16px;
      color: #409efc;
      cursor: pointer;
      &:hover {
        background-color: rgb(200, 225, 245);
      }
    }
  }

  .header {
    display: flex;
    align-items: center;
    padding: 30px 20px;
    height: 56px;

    .bt {
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
}

@media (max-width: 768px) {
  .nav {
    position: absolute;
    top: 0;
    z-index: 999;
  }
  .scale {
    left: -100%;
  }
  .open {
    left: 0;
  }
}
</style>
