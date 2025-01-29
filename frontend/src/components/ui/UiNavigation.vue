<template>
  <nav class="w-full h-[45px] bg-soft-blue-900 text-white">
    <div class="max-w-[1200px] mx-auto text-white grid grid-cols-2">
      <ul class="flex items-center justify-start gap-3">
        <li v-for="item in mainNavList" :key="item.id + item.name">
          <router-link
            :to="item.path"
            :class="{
              'bg-white text-black font-bold h-[45px] mt-1': $route.path === item.path,
              'hover:bg-white hover:text-black hover:font-bold hover:mt-1 h-[45px]':
                $route.path !== item.path,
            }"
            class="flex items-center justify-center w-20 rounded-t-sm text-white"
            v-if="item.path"
            >{{ item.name }}</router-link
          >
        </li>
      </ul>
      <ul class="flex items-center justify-end gap-3">
        <li v-for="item in userNavList" :key="item.id + item.name">
          <router-link
            :to="item.path"
            :class="{
              'bg-white text-black font-bold h-[45px] mt-1': $route.path === item.path,
              'hover:bg-white hover:text-black hover:font-bold hover:mt-1 h-[45px]':
                $route.path !== item.path,
            }"
            class="flex items-center justify-center w-20 rounded-t-sm text-white"
            v-if="item.path"
            >{{ item.name }}</router-link
          >
          <ui-button v-else label="로그아웃" @click="handleSignOut"></ui-button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';
import { mainNavList, userNavList } from '@/constants/navList';
import UiButton from './UiButton.vue';

const router = useRouter();
const authState = useAuthStore();

const handleSignOut = async () => {
  await authState.signOut();
  router.push({ name: 'SignInPage' });
};
</script>
