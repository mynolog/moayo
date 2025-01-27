<template>
  <form @submit.prevent="handleSignInSubmit">
    <div class="mx-auto w-1/5 flex flex-col justify-center gap-2">
      <ui-input placeholder="아이디" v-model="form.accountId" />
      <ui-input placeholder="비밀번호" v-model="form.password" />
      <ui-button type="submit" label="로그인" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import api from '@/api/api';
import UiInput from '@/components/ui/UiInput.vue';
import UiButton from '@/components/ui/UiButton.vue';

const form = reactive({
  accountId: '',
  password: '',
  isLoading: false,
});

//TODO: 비즈니스 로직 서비스 레어로 분리하기
const handleSignInSubmit = async () => {
  form.isLoading = true;
  try {
    const response = await api.post('/users/sign-in', {
      accountId: form.accountId,
      password: form.password,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
</script>
