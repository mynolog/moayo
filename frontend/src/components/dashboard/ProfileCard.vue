<template>
  <div class="w-full h-[250px] bg-white">
    <div v-if="user" class="h-full">
      <div class="h-full grid grid-cols-[3fr_7fr] gap-2">
        <div class="w-full flex justify-center items-center">
          <ui-avatar />
        </div>
        <div class="flex flex-col px-4 py-8 gap-3">
          <div class="flex flex-col">
            <span class="text-sm">아이디</span>
            <span class="font-semibold text-2xl">{{ user.accountId }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm">이메일</span>
            <span class="font-semibold text-2xl">&nbsp;</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm">생년월일</span>
            <span class="font-semibold text-2xl">&nbsp;</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UiAvatar from '../ui/UiAvatar.vue';
import { useAuthStore } from '@/stores/auth.store';

const user = useAuthStore().getUser;
if (!user) {
  throw new Error('다시 로그인 해주세요.');
}
</script>
