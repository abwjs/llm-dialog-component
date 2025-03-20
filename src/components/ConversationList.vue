<!-- 一个会话的组件 -->
<template>
  <div class="Box">
    <!-- 会话内容 -->
    <div class="CList">
      <!-- 会话标题 -->
      <!-- 模拟数据 -->
      <div class="text">
        <h2>JS代码问题回答介绍解释回答</h2>
      </div>
      <!-- ... -->
      <div class="ic" @click.stop="show">
        <el-icon><MoreFilled /></el-icon>
      </div>
    </div>
    <!-- 弹出框 -->
    <div class="Popup" v-if="Popupbol" ref="popupRef">
      <li>
        <el-icon>
          <EditPen size="20px" />
        </el-icon>
        <span>重命名</span>
      </li>
      <li>
        <el-icon>
          <Delete size="20px" color="#ff4d4f" />
        </el-icon>
        <span>删除</span>
      </li>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick } from 'vue'
// 控制弹出框是否弹出
const Popupbol = ref<boolean>(false)
// 获取弹出框元素
const popupRef = ref<HTMLElement | null>(null)

// 点击弹出框外面就隐藏弹出框
const handleClickOutside = (e: Event) => {
  if (!popupRef.value || !popupRef.value.contains(e.target as Node)) {
    Popupbol.value = false
    document.removeEventListener('click', handleClickOutside)
  }
}

// 点击...显示弹出框
const show = () => {
  // 改变控制弹出框变量
  Popupbol.value = !Popupbol.value
  if (Popupbol.value) {
    // 使用 setTimeout 确保弹出框已渲染
    nextTick(() => {
      document.addEventListener('click', handleClickOutside)
    })
  } else {
    // 卸载document点击事件监听
    document.removeEventListener('click', handleClickOutside)
  }
}

// 组件卸载前移除监听
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped lang="scss">
// 会话列表
.Box {
  position: relative;
  //弹出框
  .Popup {
    display: flex;
    z-index: 999;
    flex-direction: column;
    padding: 3px;
    position: absolute;
    width: 120px;
    height: 80px;
    bottom: -50px;
    right: -120px;
    transition: all 0.1s;
    box-shadow: 0 0 5px rgba(30, 30, 30, 0.1);
    border-radius: 15px;
    background-color: var(--bg-color);
    //弹出框的两个选项
    li {
      border-radius: 15px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      flex: 1;
      width: 100%;
      transition: all 0.1s;
      cursor: pointer;
      span {
        margin-left: 25px;
      }
      &:hover {
        background-color: rgba(219, 234, 254, 0.5);
      }
      // 删除选项
      &:nth-child(2) {
        color: #ff4d4f;
        &:hover {
          background-color: rgba(245, 139, 139, 0.7);
        }
      }
    }
  }
  // 会话内容
  .CList {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    width: 100%;
    height: 40px;
    transition: all 0.1s;
    padding: 5px 10px;
    cursor: pointer;

    .ic {
      height: 26px;
      width: 26px;
      cursor: pointer;
      border-radius: 10px;
      display: none;

      align-items: center;
      justify-content: center;
      transition: all 0.1s;

      &:hover {
        background-color: #fff;
      }
    }

    .text {
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover {
      background-color: rgba(219, 234, 254, 0.5);

      .ic {
        display: flex;
        box-shadow: 0 -10px 10px rgba(255, 255, 255, 0.8);
      }
    }
  }
}

/* 点击后样式 */

</style>
