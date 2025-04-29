<template>
  <div class="DialogBox">
    <div class="Dialog">
      <!-- 文件预览 -->
      <div class="Preview" :class="{ PreviewAction: fileInfoList.length !== 0 }">
        <!-- 文件组件 -->
        <div class="file" v-for="info in fileInfoList" :key="info.id" @click="showPreviewDialog(info)">
          <div class="btn-remove" @click.stop="removeFile(info.id)">
            <el-icon :size="15">
              <CloseBold />
            </el-icon>
          </div>
          <!-- 文件图标 -->
          <img src="../assets/img/logo.png" alt="" />
          <div class="content">
            <!-- 文件名字 -->
            <h2>{{ info.name }}</h2>
            <!-- 文件格式大小 -->
            <p>{{ formatFileSize(info.size) }}</p>
          </div>
          <!-- 文件上传状态 -->
          <div v-if="uploadingStatus[info.id]" class="uploading-indicator">
            <span class="spinner"></span>
          </div>
        </div>
      </div>
      <div class="Textarea">
        <!-- 文本输入 -->
        <el-input v-model="text" style="width: 100%" :autosize="{ minRows: 3, maxRows: 10 }" type="textarea"
          resize="none" placeholder="输入消息，Enter 发送，Shift + Enter 换行" />
        <div class="postBox">
          <!-- 文件上传 -->
          <FileUpload class="fileload" @update-file-info="handleFileInfo"
            @update-upload-status="handleUpdateUploadStatus" />
          <!-- 发送消息 -->
          <button class="post" @click="sending"></button>
        </div>
      </div>
    </div>

    <!-- 文件预览弹框 -->
    <el-dialog v-model="previewDialogVisible" width="80%">
      <div v-if="currentPreviewFile">
        <!-- Office 文件预览 -->
        <div v-if="isOfficeFile(currentPreviewFile.type)">
          <component :is="getVueOfficeComponent(currentPreviewFile.type)" :src="currentPreviewFile.url"
            style="width: 100%; height: 600px;" />
        </div>
        <!-- 图片文件预览 -->
        <div v-else-if="isImageFile(currentPreviewFile.type)">
          <img :src="currentPreviewFile.url" alt="图片预览"
            style="display: block; margin: 0 auto; max-width: 100%; max-height: 600px;" />
        </div>
        <!-- 文本文件预览 -->
        <div v-else-if="isTextFile(currentPreviewFile.type)">
          <pre
            style="white-space: pre-wrap; word-wrap: break-word; max-height: 600px; overflow-y: auto;">{{ currentPreviewFile.content }}</pre>
        </div>
        <!-- 音视频文件预览 -->
        <div v-else-if="isVideoFile(currentPreviewFile.type)">
          <video :src="currentPreviewFile.url" controls style="max-width: 100%; max-height: 600px;"></video>
        </div>
        <!-- PDF 文件预览 -->
        <div v-else-if="isPdfFile(currentPreviewFile.type)">
          <embed :src="currentPreviewFile.url" type="application/pdf" style="width: 100%; height: 600px;" />
        </div>
        <!-- 其他文件类型 -->
        <div v-else>
          <p>不支持的文件类型，无法预览。</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import FileUpload from './FileUpload.vue'
import VueOfficeDocx from '@vue-office/docx/lib/v3/vue-office-docx.mjs';
import '@vue-office/docx/lib/v3/index.css';
import VueOfficeExcel from '@vue-office/excel/lib/v3/vue-office-excel.mjs';
import '@vue-office/excel/lib/v3/index.css';
import VueOfficePptx from '@vue-office/pptx/lib/v3/vue-office-pptx.mjs';

// 文件信息列表
const fileInfoList = ref([])

// 文件上传状态（独立管理每个文件的上传状态）
const uploadingStatus = ref<{ [id: string]: boolean }>({})

// 弹框预览相关
const previewDialogVisible = ref(false)
const currentPreviewFile = ref(null)

// 文件类型判断方法
const txtType = ['txt', 'html', 'htm', 'asp', 'jsp', 'js', 'xml', 'json', 'properties', 'md', 'gitignore', 'log', 'java', 'py', 'c', 'cpp', 'sql', 'sh', 'bat', 'm', 'bas', 'prg', 'cmd', 'vue', 'ts', 'tsx', 'yml', 'yaml', 'css']
const pictureType = ['jpg', 'jpeg', 'png', 'gif', 'webp']
const videoType = ['mp4', 'ogg', 'webm']
const pdfType = ['pdf']
const officeType = ['docx', 'xlsx', 'pptx']

const isTextFile = (fileType: string): boolean => txtType.some(item => item === fileType)
const isImageFile = (fileType: string): boolean => pictureType.some(item => item === fileType)
const isVideoFile = (fileType: string): boolean => videoType.some(item => item === fileType)
const isPdfFile = (fileType: string): boolean => pdfType.some(item => item === fileType)
const isOfficeFile = (fileType: string): boolean => officeType.some(item => item === fileType)

// 获取对应的 vue-office 组件
const getVueOfficeComponent = (type: string) => {
  switch (type) {
    case 'docx':
      return VueOfficeDocx
    case 'xlsx':
      return VueOfficeExcel
    case 'pptx':
      return VueOfficePptx
    default:
      return null
  }
}

// 处理子组件传递的文件信息
const handleFileInfo = (fileInfo: any) => {
  console.log("接收到的文件信息：", fileInfo);
  fileInfo.id = Date.now().toString();

  const fileNameExtension = fileInfo.name.split('.').pop()?.toLowerCase();
  if (fileNameExtension) {
    fileInfo.type = fileNameExtension;
  } else {
    console.warn('无法确定文件类型，文件名中没有扩展名。');
    fileInfo.type = 'unknown';
  }

  fileInfo.content = '';

  if (isTextFile(fileInfo.type)) {
    fileInfo.content = `这是 ${fileInfo.name} 的内容，大小为 ${formatFileSize(fileInfo.size)}。`;
  }

  fileInfoList.value.push(fileInfo);
};

// 处理文件上传状态更新
const handleUpdateUploadStatus = (statusInfo) => {
  uploadingStatus.value[statusInfo.fileId] = statusInfo.uploading;
  console.log('文件状态：', statusInfo.uploading);
};

// 监听文件信息列表的变化
watch(fileInfoList, (newVal) => {
  console.log('文件信息列表更新：', newVal)
}, { deep: true })

// 显示预览弹框
const showPreviewDialog = (file) => {
  currentPreviewFile.value = file;
  previewDialogVisible.value = true;
};

// 格式化文件大小
const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  } else {
    return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }
};

// 删除文件
const removeFile = (id: string) => {
  console.log(`删除文件，ID: ${id}`);
  fileInfoList.value = fileInfoList.value.filter((item) => {
    console.log(`过滤文件，ID: ${item.id}`);
    return item.id !== id;
  });
};

// 发送消息
const text = ref<string>('');
const sending = () => {
  if (text.value.trim() === '') {
    console.log('模拟无消息提示框');
    return;
  }
  console.log('发送消息：', text.value);
  text.value = '';
};

// 监听文件信息列表的变化
watch(fileInfoList, (newVal) => {
  console.log('文件信息列表更新：', newVal)
}, { deep: true })
</script>

<style scoped lang="scss">
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

    .PreviewAction {
      padding: 10px;
    }

    .Preview {
      width: 100%;
      max-height: 180px;
      flex: 1;
      overflow-y: auto;
      display: grid;
      flex-wrap: wrap;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
      cursor: pointer;

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

        img {
          margin-right: 15px;
          width: 30px;
          height: 30px;
        }

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

        .uploading-indicator {
          position: absolute;
          right: 8px;
          top: 16px;

          .spinner {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #666;
            animation: spin 1s ease-in-out infinite;
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

        .fileload {
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

@keyframes spin {
  to {
    transform: rotate(360deg);
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
