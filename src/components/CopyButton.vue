<!-- CopyButton.vue -->
<template>
  <el-button
    type="primary"
    size="small"
    @click="copyToClipboard"
    :icon="DocumentCopy"
    :title="`复制${label}`"
  />
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { DocumentCopy } from '@element-plus/icons-vue';

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: '文本'
  }
});

const copyToClipboard = () => {
  if (props.text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(props.text).then(() => {
        ElMessage.success('复制成功');
      }).catch((err) => {
        ElMessage.error('复制失败: ' + err);
      });
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = props.text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      ElMessage.success('复制成功');
    }
  } else {
    ElMessage.warning('无内容可复制');
  }
};
</script>
