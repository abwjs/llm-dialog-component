<template>
  <div class="DialogBox" >
    <!-- 对话框组件模拟 -->
    <textarea name="" id="" :value="text"></textarea>
    <button class="file" @click="sending"></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
  width:100%;
  padding: 15px 0;
  background-color: #fff;
  min-height: 130px;
  display: flex;
  textarea {
    width: 100%;
    min-height: 100px;
    object-fit: none;
  border-radius: 30px;
  padding: 15px;
    border: 0;
    font-size: 15px;
    background-color: rgb(243, 244, 246);
    resize: none;
    box-shadow: 0 0 5px rgba(25, 25, 25, 0.2);
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

@media (max-width: 768px) {
  .DialogBox {
    width: 100%;
    textarea {
      width: 100%;
    }
  }
}
</style>
