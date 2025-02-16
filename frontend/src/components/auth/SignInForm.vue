<template>
  <form
    class="w-full h-full flex flex-col justify-center items-center"
    @submit.prevent="handleSignInSubmit"
  >
    <div class="mx-auto w-2/5 flex flex-col justify-center gap-3">
      <div class="relative">
        <span
          v-if="errors.validation.accountId"
          class="absolute right-0 text-violet-400 text-xs font-bold"
          >{{ errors.validation.accountId }}</span
        >
        <ui-input label="아이디" v-model="form.accountId" ref="inputRef" />
      </div>
      <div class="relative">
        <span
          v-if="errors.validation.password"
          class="absolute right-0 text-violet-400 text-xs font-bold"
          >{{ errors.validation.password }}</span
        >
        <ui-input label="비밀번호" v-model="form.password" type="password" />
      </div>
      <div class="relative py-2">
        <span v-if="errors.api" class="absolute text-violet-400 text-xs font-bold">{{
          errors.api
        }}</span>
      </div>
      <ui-button type="submit" :disabled="isLoading" className="mt-5">
        <span v-if="!isLoading">로그인</span>
        <ui-loading-spiner v-else />
      </ui-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api/api';
import UiInput from '@/components/ui/UiInput.vue';
import UiButton from '@/components/ui/UiButton.vue';
import UiLoadingSpiner from '../ui/UiLoadingSpiner.vue';
import { useAuthStore } from '@/stores/auth.store';
import { z } from 'zod';
import { AxiosError } from 'axios';

interface Errors {
  validation: {
    accountId: string | null;
    password: string | null;
  };
  api: string | null;
}

const signInFormSchema = z.object({
  accountId: z.string().min(1, '계정 아이디를 입력해주세요.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

const errors = ref<Errors>({
  validation: {
    accountId: null,
    password: null,
  },
  api: null,
});

const authState = useAuthStore();
const router = useRouter();

const form = reactive({
  accountId: '',
  password: '',
});
const isLoading = ref(false);

const inputRef = ref<InstanceType<typeof UiInput> | null>(null);

const handleInputFocus = () => {
  inputRef.value?.focus();
};

//TODO: 비즈니스 로직 서비스 레어로 분리하고 플로우 개선하기
const handleSignInSubmit = async () => {
  const result = signInFormSchema.safeParse(form);
  const validationErrors = result.success ? {} : result.error.flatten().fieldErrors;

  Object.keys(errors.value.validation).forEach((key) => {
    // 에러가 있으면 해당 값을 설정, 없으면 null로 설정
    errors.value.validation[key as keyof typeof errors.value.validation] =
      validationErrors[key as keyof typeof validationErrors]?.[0] || null;

    if (!result.success) {
      handleInputFocus();
    }
  });

  if (result.success) {
    isLoading.value = true;
    try {
      //TODO: API 요청 URL 변수화
      const response = await api.post('/auth/sign-in', {
        accountId: form.accountId,
        password: form.password,
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
      if (error instanceof AxiosError) {
        handleInputFocus();
        form.password = '';
        // DOM 리렌더링 후 api 에러 메시지 설정
        nextTick(() => {
          errors.value.api = error.response?.data.message;
        });
      } else {
        console.error(error);
      }
    } finally {
      isLoading.value = false;
    }
  }
};

// accountId 에러 메시지 초기화
watch(
  () => form.accountId,
  () => {
    errors.value.validation.accountId = null;
  },
);
// password 에러 메시지 초기화
watch(
  () => form.password,
  () => {
    errors.value.validation.password = null;
  },
);
// api 에러 메시지 초기화
watch(
  () => form,
  () => {
    errors.value.api = null;
  },
  { deep: true },
);
</script>
