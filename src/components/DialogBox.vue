<template>
  <div class="DialogBox" :class="{DialogBoxP:conversation.Conversation_list[0].bol}">
    <!-- 对话框组件模拟 -->
    <textarea name="" id="" :value="text"></textarea>
    <button class="file" @click="sending"></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import useConversationStore from '../store/modules/conversation'
const conversation = useConversationStore()
const text = ref('')
const sending = () => {
  if (text.value === '') {
  }
}
</script>

<style scoped lang="scss">
// 对话框
.DialogBox {
  position: relative;
  width: 750px;
  height: 130px;
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
    box-shadow: 0 0 10px rgba(25, 25, 25, 0.2);
  }
}
//有消息是绝对定位
.DialogBoxP {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
}
@media (max-width: 768px) {

  .DialogBox {
    width: 100%;
  }
}
</style>
