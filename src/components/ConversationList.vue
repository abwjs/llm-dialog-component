<!-- 会话列表组件 -->
<template>
  <div class="Box">
    <div class="CList">
      <!-- 会话标题 -->
      <!-- 模拟数据 -->
      <div class="text">
        <h2>JS代码问题回答介绍解释回答</h2>
      </div>
      <!-- ... -->
      <div class="ic" @click="show">
        <el-icon>
          <More />
        </el-icon>
      </div>

    </div>
    <div class="Popup" v-if="Popupbol" ref="Popup">
      <li>
        <el-icon>
          <EditPen size="20px"/>
        </el-icon>
        <span>重命名</span>
      </li>
      <li>
        <el-icon>
          <Delete size="20px" color="#ff4d4f"/>
        </el-icon>
        <span>删除</span>
      </li>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 控制弹出框是否显示
const Popupbol = ref(false)
const show = () => {
  Popupbol.value = true
    document.addEventListener('click', (e) => {
      ClickOutside(e)
    })
}
// 点击框外隐藏
const ClickOutside = (e: Event) => {
  const Popup = document.querySelector('.Popup') as Element
  if (!Popup.contains(e.target as null | Node)) {
    Popupbol.value = false
  }
}
</script>

<style scoped lang="scss">
.Box {
  position: relative;

  .Popup {
    display: flex;
    flex-direction: column;
    padding: 3px;
    position: absolute;
    width: 120px;
    height: 80px;
    bottom: -50px;
    right: -120px;
    transition: all 0.1s;
    box-shadow: 0 0 5px rgba(30,30,30,0.1);
    border-radius: 15px;
    background-color: var(--bg-color);
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
      &:nth-child(2) {
        color: #ff4d4f;
        &:hover{
        background-color: rgba(245, 139, 139, 0.7);
        }
      }
    }

  }

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
.C {
  background-color: rgb(200, 225, 245);
}
</style>
