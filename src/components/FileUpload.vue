<template>
  <el-upload
    v-model:file-list="fileList"
    class="upload-demo"
    multiple
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-exceed="handleExceed"
    :auto-upload="false"
    :on-change="handleChange"
    :show-file-list="false"
  >
    <!-- 自定义上传按钮，使用图片 -->
    <div class="upload-button">
      <img src="../assets/img/filelink.png" alt="上传" class="upload-image" @click="submitUpload" />
      <div class="upload-tip">上传最大文件不超过512 MB</div>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        <!-- 提示信息默认隐藏 -->
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadProps, UploadUserFile, UploadFile } from 'element-plus'
import { uploadFile } from '../api/file'
const emit = defineEmits(['update-file-info']) // 定义自定义事件

const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile)
}

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`确定要取消上传文件 "${uploadFile.name}" 吗？`).then(
    () => true,
    () => false,
  )
}

const handleChange: UploadProps['onChange'] = async (file: UploadFile) => {
  if (!file.raw) {
    ElMessage.error('未找到文件')
    return
  }

  try {
    const response = await uploadFile(file.raw as File) // 调用自定义的上传函数
    if (response) {
      ElMessage.success(`文件 "${file.name}" 上传成功。`)
      console.log(response)
      // 更新文件列表，添加上传后的文件 URL
      file.url = response.url // 假设返回的响应中包含文件的 URL
      file.status = 'success'

      // 发射文件信息到父组件
      const fileInfo = {
        name: file.name,
        size: file.size, // 文件大小（单位：字节）
        url: response.url, // 文件上传后的 URL
      }
      emit('update-file-info', fileInfo)
    }
  } catch (error) {
    ElMessage.error(`文件 "${file.name}" 上传失败。`)
    console.error(error)
    file.status = 'fail'
  }
}
// const submitUpload = () => {
//   // 触发文件上传
//   fileList.value.forEach((file) => {
//     if (file.status === 'ready') {
//       handleChange(file);
//     }
//   });
// };
</script>

<style scoped>
.upload-button {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.upload-image {
  width: 20px;
  height: auto;
  /* 根据需要调整图片大小 */
}

.upload-tip {
  position: absolute;
  bottom: 30px;
  /* 调整提示信息的位置 */
  left: -90px;
  width: 150px;
  /* height: 20px; */
  line-height: 20px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  color: #333;
  visibility: hidden;
  transition:
    visibility 0.3s,
    opacity 0.3s;
  opacity: 0;
}

.upload-button:hover .upload-tip {
  visibility: visible;
  /* 鼠标经过时显示 */
  opacity: 1;
  /* 鼠标经过时变为不透明 */
}
</style>
