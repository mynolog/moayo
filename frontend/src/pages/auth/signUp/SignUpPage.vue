<template>
  <auth-layout>
    <div
      class="min-w-[640px] min-h-[28rem] mt-10 py-10 flex flex-col gap-5 justify-center items-center bg-form-background rounded-sm"
    >
      <ui-logo class="w-full text-5xl flex justify-center items-center text-mint-900" />
      <sign-up-form />
      <div class="text-md font-bold">
        <span>이미 계정이 있으신가요?</span>
        <router-link :to="{ name: 'SignInPage' }" class="text-mint-800">
          로그인하기 &rarr;</router-link
        >
      </div>
    </div>
  </auth-layout>
</template>

<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import UiLogo from '@/components/ui/UiLogo.vue';
import SignUpForm from '@/components/auth/SignUpForm.vue';
</script>
