<!-- 消息列表组件 -->
<template>
  <div class="chatBox">
    <div class="Message" :class="{AILeft:item%2===0,UserRight:item%2!==0}" v-for="item in 100" :key="item">
      <!-- ai回答 -->
      <div class="AILeft chat" v-if="item % 2 === 0">
        <span>11111111111111222</span>
      </div>
      <!-- 用户回答 -->
      <div class="UserRight chat" v-else>
        <span>11111111111121</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
::-webkit-scrollbar {
    width: 8px;
    height: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块部分 */
::-webkit-scrollbar-thumb {
  cursor: pointer;

  background-color: #b1afaf;
  border-radius: 10px;
  height: 100px;
}

/* 鼠标悬停在滑块上时 */
::-webkit-scrollbar-thumb:hover {
  background-color: #848484;
}


.chatBox {
  width: 100%;
  overflow-y: auto;
  .Message {
    min-height: 30px;
    width: 100%;
  display: flex;
  margin: 15px 0;
  .chat {
    background-color: #f4f4f4;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    max-width: 60%;

  }


    span {
      border-radius: 10px;
    }
  }

  .AILeft {

justify-content: flex-start;
}

.UserRight {

justify-content: flex-end;
}

}
</style>
