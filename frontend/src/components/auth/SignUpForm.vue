<template>
  <form
    class="w-full h-full flex flex-col justify-center items-center"
    @submit.prevent="handleSignUpSubmit"
  >
    <div class="mx-auto w-2/5 flex flex-col justify-center gap-3">
      <ui-input label="아이디 *" v-model="form.accountId" />
      <ui-input label="비밀번호 *" v-model="form.password" type="password" />
      <ui-input label="비밀번호 확인 *" v-model="form.confirmPassword" type="password" />
      <ui-input label="이메일 주소" v-model="form.email" />
      <ui-button
        type="submit"
        :label="isLoading ? '가입하는 중...' : '가입하기'"
        :disabled="isLoading"
        className="mt-5"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api/api';
import UiInput from '@/components/ui/UiInput.vue';
import UiButton from '@/components/ui/UiButton.vue';
import { useAuthStore } from '@/stores/auth.store';

const authState = useAuthStore();
const router = useRouter();

const form = reactive({
  accountId: '',
  password: '',
  confirmPassword: '',
  email: '',
});
const isLoading = ref(false);

//TODO: 비즈니스 로직 서비스 레어로 분리하고 플로우 개선하기
const handleSignUpSubmit = async () => {
  isLoading.value = true;
  try {
    //TODO: API 요청 URL 변수화
    const response = await api.post('/auth/sign-up', {
      accountId: form.accountId,
      password: form.password,
      confirmPassword: form.confirmPassword,
      email: form.email,
    });
    //TODO: 응답 결과에 따라 분기처리하기
    if (response.data) {
      const isLoggedIn = await authState.signIn(response.data.user);
      if (!isLoggedIn) {
        throw new Error('로그인 정보 저장 실패');
      }
      router.push({ name: 'MainPage' });
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>
