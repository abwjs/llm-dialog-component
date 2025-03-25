<!-- 消息列表组件 -->
<template>
  <div class="chatBox">
    <div
      class="Message"
      :class="{ AILeft: item.role === 'assistant', UserRight: item.role === 'user' }"
      v-for="item in ContentList"
      :key="item.id"
    >
      <!-- ai回答 -->
      <div class="left chat" v-if="item.role === 'assistant'">
        <img src="../assets/img/logo.pngd" alt="" />
        <span>{{ item.value }}</span>
      </div>
      <!-- 用户回答 -->
      <div class="right chat" v-else>
        <span>{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRef } from 'vue';

const props = defineProps(['ContentList'])
const ContentList = toRef(props.ContentList)
console.log(ContentList.value);

</script>

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
  background-color: #888;
  border-radius: 10px;
  height: 300px;
}

/* 鼠标悬停在滑块上时 */
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.chatBox {
  flex: 1;
  padding: 0 10px;
  width: 100%;
  overflow-y: auto;

  .Message {
    min-height: 30px;
    width: 100%;
    display: flex;
    margin: 20px 0;

    .chat {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      max-width: 90%;
    }

    .left {
      background-color: #f4f4f4;
    }

    .right {
      background-color: rgba(219, 234, 254);
    }

    span {
      border-radius: 10px;
      word-break: break-all;
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
