<template>
  <div class="Box">
    <!-- 上下布局 -->
    <header>
      <div class="header-left">OmniChat</div>
      <div class="header-right">
        <!-- 搜索框组件 -->

        <input type="text" class="inp" />
        <!-- github -->
        <a href="https://github.com/abwjs/llm-dialog-component" target="_blank" class="github-link">
          <img src="@/assets/img/github.png" alt="GitHub" class="github-icon" />
        </a>
      </div>
    </header>
    <main>
      <div class="title">
        <h2>OmniChat</h2>
        <span>全模态AI对话组件库，专为开发者打造LLM应用而生</span>
      </div>
      <!-- 内容 -->
      <div class="main">
        <div class="box" v-for="(item, index) in proposeList" :key="index">
          <el-icon color="#409efc" class="no-inherit">
            <!-- 动态组件生成图标 -->
            <component :is="item.icon"></component>
          </el-icon>
          <div class="content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
      <!-- 开始对话按钮 -->
      <router-link class="bt" to="/chat">
        <el-button type="primary" plain size="large">开始对话</el-button>
      </router-link>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const proposeList = ref([
  {
    title: '多模态交互',
    text: '支持文本/图片/PDF混合输入，实时解析',
    icon: 'ChatLineRound',
  },
  {
    title: '流式对话输出',
    text: '逐字流式渲染，支持中途打断与内容修正',
    icon: 'Document',
  },
  {
    title: '多对话框设计',
    text: '提供内嵌对话框和全屏工作台双模式',
    icon: 'Operation',
  },
])
</script>

<style scoped lang="scss">
.Box {
  // 保证最小有100vh
  min-height: 100vh;
  background-color: var(--bg-color);
}

header {
  height: 64px; // 头部高度
  display: flex;
  align-items: center; // 垂直居中
  justify-content: space-between; // 两端对齐
  padding: 0 35px;
  border: 1px solid variable.$Border-Coloe;

  // logo
  .header-left {
    font-size: 22px;
    font-weight: 600;
  }

  .header-right {
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      margin: 0 10px;
    }
  }
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;

  .title {
    margin: 0 auto;
    text-align: center;
    font-size: 50px;
    font-weight: 600;

    h2 {
      margin-bottom: 10px;
    }

    span {
      color: rgb(71, 85, 105);
      font-size: 35px;
    }
  }

  .main {
    display: flex;
    align-items: center;
    margin-top: 100px;
    flex-wrap: wrap;
    gap: 16px;

    .box {
      flex: 1;
      text-align: center;
      border-radius: 20px;
      padding: 30px 18px;
      font-size: 22px;
      transition: all 0.5s;
      background-color: var(--bg-color);
      box-shadow:
        rgb(241, 245, 249) 0px 0px 0px 1px,
        rgba(0, 0, 0, 0.05) 0px 2px 4px,
        rgba(0, 0, 0, 0.05) 0px 12px 24px;

      &:hover {
        transform: translateY(-10px);
      }

      .iconfont {
        font-size: 22px;
        color: rgb(49, 139, 255);
      }

      h3 {
        font-weight: 600;
        color: #000;
        margin: 16px 0;
      }

      p {
        font-size: 16px;
        color: rgb(100, 116, 139);
      }
    }
  }

  //按钮
  .bt {
    display: block;
    width: 96px;
    height: 40px;
    margin: 100px auto;


  }
}

//媒体查询移动端
@media (max-width: 768px) {
  .inp {
    width: 150px;
  }

  /* 移动端头部 */
  .main {
    flex-direction: column;

    .box {
      width: 100%;
    }
  }
}
</style>
