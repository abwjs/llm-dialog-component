<template>
  <div class="DialogBox">
    <div class="Textarea">
      <el-input v-model="text" style="width: 100%" :autosize="{ minRows: 1, maxRows: 8 }" type="textarea"
        resize="none"
        placeholder="输入消息，Enter 发送，Shift + Enter 换行"
        />
      <button class="file" @click="sending"></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emits = defineEmits(['sending'])
const text = ref('')
const sending = () => {
  if (text.value === '') {
  } else {
    // 传给对话内容组件处理
    emits('sending', text.value)
    text.value = ''
  }
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
  .Textarea {
    overflow: hidden;
    width: 100%;
    padding: 0 5px;
    border-radius: 30px;
    border: 0;
    background-color: rgb(243, 244, 246);
    box-shadow: 0 0 5px rgba(25, 25, 25, 0.2);
      //输入框自定义样式s
  :deep(.el-textarea__inner) {
    border: none;
    background-color: rgb(243, 244, 246);
    box-shadow: none;
    font-size: 16px;

    &:focus {
      border: none;
      box-shadow: none;
    }
  }
  .file {
      position: absolute;
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

@media (max-width: 768px) {
  .DialogBox {
    width: 100%;
    max-width: 100%;
  }
}
</style>
