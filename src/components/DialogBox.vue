<template>
  <div class="DialogBox">
    <div class="Dialog">
      <!-- 文件预览 -->
      <div class="Preview" :class="{ PreviewAction: FileArr.length !== 0 }">
        <!-- 文件组件 -->
        <div class="file" v-for="item in FileArr" :key="item.id">
          <div class="btn-remove" @click="removeFile(item.id)">
            <el-icon :size="15">
              <CloseBold />
            </el-icon>
          </div>
          <!-- 文件图标 -->
          <img src="../assets/img/logo.png" alt="" />
          <div class="content">
            <!-- 文件名字 -->
            <h2>{{ item.title }}</h2>
            <!-- 文件格式大小 -->
            <p>{{ item.fileobj }} {{ item.D }}</p>
          </div>
        </div>
      </div>
      <div class="Textarea">
        <!-- 文本输入 -->
        <el-input
          v-model="text"
          style="width: 100%"
          :autosize="{ minRows: 3, maxRows: 10 }"
          type="textarea"
          resize="none"
          placeholder="输入消息，Enter 发送，Shift + Enter 换行"
        />
        <div class="postBox">
          <!-- 文件上传 -->
          <div class="Link">
            <el-icon :size="20"><Paperclip /></el-icon>
          </div>
          <!-- 图片上传 -->
          <div class="i">
            <el-icon :size="20"><Paperclip /></el-icon>
          </div>
          <!-- 发送消息 -->
          <button class="post" @click="sending"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const emits = defineEmits(['sending'])
const text = ref<string>('')
// 模拟数据
const FileArr = ref([
  {
    id: '1',
    title: '我不是文件我不是文件我不是文件我不是文件',
    fileobj: 'HTML',
    // 文件大小
    D: '100MB',
  },
])
const sending = () => {
  if (text.value === '') {
    // 模拟提示框
    console.log()
  } else {
    // 传给对话内容组件处理
    emits('sending', text.value)
    text.value = ''
  }
}
const removeFile = (id) => {
  FileArr.value = FileArr.value.filter((item) => {
    return item.id !== id
  })
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    width: 100%;
    border-radius: 30px;
    border: 0.5px solid rgba(219, 234, 254);
    box-shadow: 0 0 5px rgba(25, 25, 25, 0.2);

    // 当有文件上传时
    .PreviewAction {
      padding: 10px;
    }

    //文件预览 网格布局
    .Preview {
      width: 100%;
      max-height: 180px;
      flex: 1;
      overflow-y: auto;
      display: grid;
      flex-wrap: wrap;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;

      .file {
        position: relative;
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

          .btn-remove {
            display: flex;
          }
        }

        //删除图标
        .btn-remove {
          display: none;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          position: absolute;
          justify-content: center;
          align-items: center;
          right: 5px;
          top: 5px;
          transition: all 0.1s;

          &:hover {
            background-color: rgb(71, 85, 105);
            color: rgb(243, 244, 246);
          }
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
          }
        }
      }
    }

    .Textarea {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
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

      .postBox {
        display: flex;
        width: 100%;
        justify-content: flex-end;
        gap: 15px;
        .Link,
        .i {
          width: 28px;
          height: 28px;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.1s;
          &:hover {
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
        .post {
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
}

@media (max-width: 768px) {
  .DialogBox {
    width: 100%;
    max-width: 100%;

    .Dialog {
      .Preview {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
}
</style>
