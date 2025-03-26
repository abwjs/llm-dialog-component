<template>
  <div class="DialogBox">
    <div class="Dialog">
      <!-- 文件预览 -->
      <div class="Preview">
        <!-- 文件组件 -->
        <div class="file" v-for="item in 10" :key="item">
          <!-- 文件图标 -->
          <img src="../assets/img/logo.png" alt="">
          <div class="content">
            <!-- 文件名字 -->
            <h2>我不是文件我不是文件我不是文件</h2>
            <!-- 文件格式大小 -->
            <p>HTML 100MB</p>
          </div>
        </div>
      </div>
      <div class="Textarea">
        <!-- 文本输入 -->
        <el-input v-model="text" style="width: 100%" :autosize="{ minRows: 3, maxRows: 10 }" type="textarea"
          resize="none" placeholder="输入消息，Enter 发送，Shift + Enter 换行" />
        <!-- 文件上传 -->
        <button class="post" @click="sending"></button>
      </div>

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

  .Dialog {
    background-color: #fff;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;
    border-radius: 30px;
    border: 0.5px solid rgba(219, 234, 254);
    box-shadow: 0 0 5px rgba(25, 25, 25, 0.2);

    //文件预览 网格布局
    .Preview {
      width: 100%;
      padding: 10px;
      padding-top: 0;
      max-height: 180px;
      flex: 1;
      overflow-y: auto;
      display: grid;
      flex-wrap: wrap;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;

      .file {
        cursor: pointer;
        border-radius: 15px;
        height: 52px;
        background-color: rgb(243, 244, 246);
        transition: all 0.3s;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        padding: 5px 10px;
        min-width: 0;

        &:hover {
          box-shadow: 0 5px 15px rgb(219, 220, 222);
        }

        // 文件的图标
        img {
          margin-right: 15px;
          width: 30px;
          height: 30px;
        }

        // 文件的文字内容
        .content {
          min-width: 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          h2 {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          p {
            font-size: 12px;
            opacity: 0.8;
            color: rgb(71, 85, 105);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }

    .Textarea {
      background-color: rgb(243, 244, 246);
      border: 0.5px solid rgba(219, 234, 254);
      border-radius: 20px;
      width: 100%;
      padding: 6px;

      //输入框自定义样式s
      :deep(.el-textarea__inner) {
        border: none;
        background-color: rgb(243, 244, 246);
        box-shadow: none;
        font-size: 16px;
        border: 0;

        &:focus {
          box-shadow: none;
        }
      }

      .post {
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
}

@media (max-width: 768px) {
  .DialogBox {
    width: 100%;
    max-width: 100%;
  }
}
</style>
