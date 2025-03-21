<template>
  <div class="Box">
    <!-- 侧边导航栏占位 -->
    <OffCanvas></OffCanvas>
    <div class="main">
      <div class="nav">
        <!-- 返回按钮 -->
        <router-link to="/" class="active"></router-link>
      </div>
      <div class="Form1" v-if="true">
        <div class="word">
          <!-- logo占位 -->
          <h2>我是OmniChat，开始对话吧</h2>
          <p>有什么可以帮你的？</p>
        </div>
        <!-- 对话框组件模拟 -->
        <div class="ip">
          <textarea name="" id="" :value="text"></textarea>
          <button class="file" @click="sending">

          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OffCanvas from '@/components/OffCanvas.vue'
import {ref} from 'vue'
const text = ref('')
const sending = ()=>{

}


</script>

<style scoped lang="scss">
.Box {
  display: flex;
}

.active {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  box-shadow:  0 0 10px rgba(0,0,0,0.3);
}

.main {
  flex: 1;
  background-color: var(--bg-color);

  .Form1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: center;

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

    .ip {
      position: relative;
      width: 600px;
      height: 125px;
      border-radius: 30px;
      background-color: rgb(243, 244, 246);
      padding: 10px;
      textarea {
        width: 100%;
        height: 100%;
        object-fit: none;
        border: 0;
        font-size: 15px;
      background-color: rgb(243, 244, 246);
      resize: none;
      }
      .file {
        position: absolute;
        right: 10px;
        bottom: 5px;
        cursor: pointer;
        width: 25px;
        height: 25px;
        border-radius: 5px;
        border: 0;
        box-shadow: 0  0 10px rgba(25,25,25,0.2);
      }
    }
  }
}

//移动端适配
@media (max-width: 768px) {

  .main {
    padding: 0 20px;

    .Form1 {
      width: 100%;

      .ip {
        width: 100%;
      }
    }
  }
}
</style>
