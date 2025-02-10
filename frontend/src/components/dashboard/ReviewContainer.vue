<template>
  <div class="w-full mt-5">
    <h3 class="text-xl font-semibold">{{ accountId }}님의 리뷰</h3>
    <ul></ul>
  </div>
</template>

<script setup lang="ts">
import ReviewCard from './ReviewCard.vue';
import { useAuthStore } from '@/stores/auth.store';

const user = useAuthStore().getUser;
if (!user) {
  throw new Error('다시 로그인 해주세요.');
}
const { accountId } = user;
</script>
