<template>
  <el-upload v-model:file-list="fileList" class="upload-demo" multiple :on-preview="handlePreview"
    :on-remove="handleRemove" :before-remove="beforeRemove" :on-exceed="handleExceed" :auto-upload="false"
    :on-change="handleChange" :show-file-list="false">
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
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { UploadProps, UploadUserFile, UploadFile } from 'element-plus';
import { defineEmits } from 'vue';
import { uploadFile } from '../api/file';

const emit = defineEmits(['update-file-info', 'update-upload-status']);
const fileList = ref<UploadUserFile[]>([]);

// 并发上传控制
const maxConcurrentUploads = 3;
let ongoingUploads = 0;

const handleChange: UploadProps['onChange'] = async (file: UploadFile) => {
  if (!file.raw) {
    ElMessage.error('未找到文件');
    return;
  }

  try {
    const fileUrl = URL.createObjectURL(file.raw);

    const fileInfo = {
      name: file.name,
      size: file.size,
      url: fileUrl,
      id: Date.now().toString(),  // 添加文件唯一标识符
      uploading: true
    };

    emit('update-file-info', fileInfo);
    emit('update-upload-status', {
      uploading: true,
      fileId: fileInfo.id  // 传递文件唯一标识符
    });
    file.status = 'uploading';
    const response = await uploadFile(file.raw);

    if (response.code === 0) {
      emit('update-upload-status', {
        uploading: false,
        fileId: fileInfo.id  // 传递文件唯一标识符
      });
      file.status = 'success';
      ElMessage.success(`文件 "${file.name}" 上传成功。`);

      // 根据需要更新文件信息
      Object.assign(fileInfo, {
        id: response.data.id,
        bytes: response.data.bytes,
        created_at: response.data.created_at,
        file_name: response.data.file_name
      });
    } else {
      emit('update-upload-status', {
        uploading: false,
        fileId: fileInfo.id  // 传递文件唯一标识符
      });
      file.status = 'fail';
      ElMessage.error(`文件 "${file.name}" 上传失败：${response.msg || '未知错误'}`);
    }
  } catch (error: any) {
    ElMessage.error(
      `文件 "${file.name}" 上传失败：${error.response?.data?.message || error.message}`
    );
    console.error(error);
    file.status = 'fail';
  } finally {
    ongoingUploads--;
  }
};

const submitUpload = () => {
  const filesToUpload = fileList.value.filter(file => file.status === 'ready');

  filesToUpload.forEach((file) => {
    if (ongoingUploads < maxConcurrentUploads) {
      handleChange(file as any);
      file.status = 'uploading';
      ongoingUploads++;
    }
  });
};
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
}

.upload-tip {
  position: absolute;
  bottom: 30px;
  left: -90px;
  width: 150px;
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
  opacity: 1;
}
</style>
