<!-- 消息列表组件 -->
<template>
  <div class="V">
    <!-- ai回答 -->
    <div class="text left">
      <div class="b">1111111</div>
    </div>
    <!-- 用户回答 -->
    <div class="text right">
    <div class="b">11111111111121</div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.V {
  width: 100%;
  height: 100%;

  .text {
    width: 100%;

    .b {
      max-width: 60%;
      background-color: #eee;
      border-radius: 10px;
      min-height: 30px;
    }
  }

  .left {
    text-align: left;
  }

  .right {
    text-align: right;
  }

}
</style>
