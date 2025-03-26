<template>
  <el-upload v-model:file-list="fileList" class="upload-demo" multiple :on-preview="handlePreview"
    :on-remove="handleRemove" :before-remove="beforeRemove" :limit="3" :on-exceed="handleExceed" :auto-upload="false"
    :on-change="handleChange">
    <!-- 自定义上传按钮，使用图片 -->
    <div class="upload-button">
      <img src="../assets/img/filelink.png" alt="上传" class="upload-image" @click="submitUpload" />
    </div>
    <template #tip>
      <div class="el-upload__tip">
        上传最大文件不超过512 MB
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import type { UploadProps, UploadUserFile, UploadFile } from 'element-plus';
import { uploadFile } from '../api/file'; // 引入您的上传文件 API

const fileList = ref<UploadUserFile[]>([]);

const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(
    `最多只能上传3个文件，您本次选择了${files.length}个文件，总共${files.length + uploadFiles.length}个`
  );
};

const beforeRemove: UploadProps['beforeRemove'] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `确定要取消上传文件 "${uploadFile.name}" 吗？`
  ).then(
    () => true,
    () => false
  );
};

const handleChange: UploadProps['onChange'] = async (file: UploadFile) => {
  if (!file.raw) {
    ElMessage.error('未找到文件');
    return;
  }

  try {
    const response = await uploadFile(file.raw as File); // 调用自定义的上传函数
    if (response) {
      ElMessage.success(`文件 "${file.name}" 上传成功。`);
      console.log(response);
      // 更新文件列表，添加上传后的文件 URL
      file.url = response.url; // 假设返回的响应中包含文件的 URL
      file.status = 'success';
    }
  } catch (error) {
    ElMessage.error(`文件 "${file.name}" 上传失败。`);
    console.error(error);
    file.status = 'fail';
  }
};

const submitUpload = () => {
  // 触发文件上传
  fileList.value.forEach((file) => {
    if (file.status === 'ready') {
      handleChange(file);
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
  width: 25px;
  height: auto;
  /* 根据需要调整图片大小 */
}
</style>
