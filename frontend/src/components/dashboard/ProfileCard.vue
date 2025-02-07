<template>
  <div class="w-full h-1/3 bg-white">
    <div
      v-if="userProfileData && !isUserProfileLoading"
      class="h-full grid grid-cols-[3fr_7fr] gap-2"
    >
      <div class="w-full flex justify-center items-center">
        <ui-avatar />
      </div>
      <div class="flex flex-col px-4 py-8 gap-3">
        <div class="flex flex-col">
          <span class="text-sm">아이디</span>
          <span class="font-semibold text-2xl">{{ userProfile.accountId }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm">이메일 주소</span>
          <span class="text-lg">{{ userProfile.email }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useUserProfile } from '@/composables/useUserProfile';
import UiAvatar from '../ui/UiAvatar.vue';

const userProfile = reactive({
  accountId: '',
  email: '',
  birthDate: '',
  gender: '',
});
const { userProfileData, isUserProfileLoading, userProfileError } = useUserProfile();

onMounted(() => {
  if (userProfileData.value) {
    userProfile.accountId = userProfileData.value.accountId;
    userProfile.email = userProfileData.value.email || '';
  }
});
</script>
