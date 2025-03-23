<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { CreateConversations } from './api/conversation';
import Talk from './api/char'
CreateConversations()
Talk()
</script>

<style scoped></style>
