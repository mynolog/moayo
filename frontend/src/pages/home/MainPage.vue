<template>
  <main-layout>
    <div v-if="user">
      <h3>{{ user.accountId }}님 환영합니다.</h3>
    </div>
  </main-layout>
</template>

<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue';
import { useAuthStore } from '@/stores/auth.store';

const authState = useAuthStore();
const user = authState.getUser;
</script>
