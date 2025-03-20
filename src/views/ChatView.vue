<template>
  <div class="Box">
    <!-- 侧边导航栏占位 -->
    <OffCanvas class="Offcanvas"></OffCanvas>
    <div class="main">
      <!-- 遮罩层 -->
      <div class="MaskLayer" v-if="NavStore.navbol" @click="Scale"></div>
      <div class="nav">
        <!-- 侧边框按钮 -->
        <button class="headerbt" v-if="!NavStore.navbol" @click="Scale"></button>
        <!-- 问题标题 -->
        <h2>你是谁</h2>
        <!-- 返回按钮 -->
        <router-link to="/" class="active"></router-link>
      </div>
      <!-- 有消息时显示的组件 -->
      <div class="Form1 Form" v-if="!Conversation.Conversation_list[0].bol">
        <div class="word">
          <!-- logo占位 -->
          <h2>我是OmniChat，开始对话吧</h2>
          <p>有什么可以帮你的？</p>
        </div>
        <!-- 对话框组件 -->

        <DialogBox></DialogBox>
      </div>
      <!-- 有消息时显示的组件 -->
      <div class="Form2 Form" v-else>
        <DialogBox></DialogBox>
        <!-- 消息列表组件 -->
        <VT></VT>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 侧边导航栏组件
import OffCanvas from '@/components/OffCanvas.vue'
// 对话框组件
import DialogBox from '../components/DialogBox.vue'
// 消息列表组件
import VT from '../components/VT.vue'
import useNavStore from '../store/modules/nav'
import useConversationStore from '../store/modules/conversation'
const NavStore = useNavStore()
const Conversation = useConversationStore()
// 修改导航栏隐藏显示
const Scale = () => {
  NavStore.$patch((store) => {
    store.navbol = !store.navbol
  })
}

</script>

<style scoped lang="scss">
.Box {
  display: flex;
  min-height: 100vh;

  .main {
    padding: 0 10px;

    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--bg-color);

    // 遮罩层
    .MaskLayer {
      display: none;
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
      width: 750px;
      position: relative;
      overflow: auto;
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
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
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
