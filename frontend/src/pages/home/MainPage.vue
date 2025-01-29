<template>
  <h2>Home</h2>
  <div v-if="user">
    <h3>{{ user.accountId }}님 환영합니다.</h3>
    <ui-button label="로그아웃" @click="handleSignOut" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import UiButton from '@/components/ui/UiButton.vue';

const router = useRouter();
const authState = useAuthStore();
const user = authState.getUser;

const handleSignOut = async () => {
  await authState.signOut();
  router.push({ name: 'SignInPage' });
};
</script>
