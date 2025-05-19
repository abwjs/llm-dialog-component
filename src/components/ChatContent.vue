<!-- 消息列表组件 -->
<template >
  <div class="chatBox" v-loading="isLoading">
    <div class="Message" :class="{ AILeft: item.role === 'assistant', UserRight: item.role === 'user' }"
      v-for="item in visibleMessages" :key="item.id" v-memo="[item.id, item.content]">
      <img src="../assets/img/logo.png" alt="" v-if="item.role === 'assistant'" />
      <!-- ai回答 -->
      <div v-loading="!item.content" class="left chat" v-if="item.role === 'assistant'">
        <!-- <CopyButton :text="item.content"></CopyButton> -->
        <MdRenderer :source="item.content"></MdRenderer>
      </div>
      <div class="right chat" v-else>
        <span>
          <div v-if="fileInfoList.length > 0">
            <div class="file" v-for="info in fileInfoList" :key="info.id">
              <img src="../assets/img/logo.png" alt="" />
              <div class="content">
                <h2>{{ info.name }}</h2>
                <p>{{ formatFileSize(info.size) }}</p>
              </div>
            </div>
          </div>
          {{ item.content }}
        </span>
      </div>
    </div>
    <div ref="observerSentinel" class="sentinel"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, shallowRef } from 'vue'
import { storeToRefs } from 'pinia'
// import CopyButton from './CopyButton.vue'
import MdRenderer from './MdRenderer.vue'
import useConversationStore from '../store/modules/conversation'
import useFileStore from '../store/modules/fileStore';
const fileStore = useFileStore();
const { fileInfoList } = storeToRefs(fileStore);
const scrollContainer = ref<HTMLElement>()
const observerSentinel = ref<HTMLElement>()
const loadingMore = ref(false)
const visibleCount = ref(50) // 初始渲染数量
const renderedMessages = shallowRef([]) // 浅层响应

// 优化后的可见消息计算
const visibleMessages = computed(() => {
  return ContentList.value.slice(-visibleCount.value)
})

// 滚动位置记录
let scrollTopBeforeLoading = 0

// Intersection Observer 实现
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting && !loadingMore.value) {
    loadMoreHistory()
  }
}, {
  root: scrollContainer.value,
  threshold: 0.1,
  rootMargin: '500px' // 提前500px触发
})

// 加载更多历史
const loadMoreHistory = () => {
  loadingMore.value = true
  scrollTopBeforeLoading = scrollContainer.value?.scrollTop || 0
  const prevHeight = scrollContainer.value?.scrollHeight || 0

  // 模拟加载延迟
  requestAnimationFrame(() => {
    visibleCount.value += 30 // 每次增加30条

    // 下一帧调整滚动位置
    requestAnimationFrame(() => {
      if (scrollContainer.value) {
        const newHeight = scrollContainer.value.scrollHeight
        scrollContainer.value.scrollTop = newHeight - prevHeight + scrollTopBeforeLoading
      }
      loadingMore.value = false
    })
  })
}
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

// 初始化
onMounted(() => {
  renderedMessages.value = [...ConversationStore.ContentList]
  if (observerSentinel.value) {
    observer.observe(observerSentinel.value)
  }
})

onBeforeUnmount(() => observer.disconnect())
const ConversationStore = useConversationStore()

const { ContentList, isLoading } = storeToRefs(ConversationStore)
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  width: 8px;
  height: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块部分 */
::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  height: 300px;
}

/* 鼠标悬停在滑块上时 */
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}

.chatBox {
  flex: 1;
  padding: 0 10px;
  width: 100%;
  overflow-y: auto;

  .Message {
    min-height: 30px;
    width: 100%;
    display: flex;
    margin: 20px 0;

    .chat {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 15px;
      max-width: 90%;
    }

    .left {
    }

    .right {
      background-color: rgba(219, 234, 254);
    }

    span {
      border-radius: 10px;
      word-break: break-all;
    }
  }

  .AILeft {
    justify-content: flex-start;

    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
      border: 1px solid rgba(219, 234, 254);
    }
  }

  .UserRight {
    justify-content: flex-end;
  }
}
// 在原有样式最后添加
.loading-text {
  text-align: center;
  padding: 10px;
  color: #666;
  font-size: 0.9em;
}

.sentinel {
  height: 1px;
  visibility: hidden;
}

.chatBox {
  contain: strict;
  will-change: transform;
  backface-visibility: hidden;

  .Message {
    contain: content;
    transform: translateZ(0);
  }

  .chat {
    will-change: transform;
  }
}
.file {
  position: relative;
  cursor: pointer;
  border-radius: 15px;
  height: 52px;
  width: 200px;
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
}
</style>
