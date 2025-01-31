<template>
  <nav class="sticky top-0 w-full h-[45px] bg-mint-900 z-50">
    <div class="max-w-[1200px] mx-auto grid grid-cols-3">
      <ul class="flex items-center justify-start gap-3">
        <li v-for="item in mainNavList" :key="item.id + item.name">
          <router-link
            :to="item.path"
            :class="{
              'bg-background text-black font-bold h-[45px] mt-1': $route.path === item.path,
              'text-white hover:bg-background hover:text-black hover:font-bold hover:mt-1 h-[45px]':
                $route.path !== item.path,
            }"
            class="flex items-center justify-center w-20 rounded-t-sm"
            v-if="item.path"
          >
            <font-awesome-icon :icon="item.icon" class="w-6 h-6" />
          </router-link>
        </li>
      </ul>
      <div class="w-full h-full flex items-center justify-center">
        <ui-logo className="text-2xl text-white hover:cursor-pointer" @click="navigateToHome" />
      </div>
      <ul class="flex items-center justify-end gap-3">
        <li v-for="item in userNavList" :key="item.id + item.name">
          <router-link
            :to="item.path"
            :class="{
              'bg-white text-black font-bold h-[45px] mt-1': $route.path === item.path,
              'text-white hover:bg-white hover:text-black hover:font-bold hover:mt-1 h-[45px]':
                $route.path !== item.path,
            }"
            class="flex items-center justify-center w-20 rounded-t-sm"
            v-if="item.path"
          >
            <font-awesome-icon :icon="item.icon" class="w-6 h-6"
          /></router-link>
          <ui-button v-else @click="handleSignOut" className="bg-transparent">
            <font-awesome-icon :icon="item.icon" class="w-6 h-6" />
          </ui-button>
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
import UiLogo from './UiLogo.vue';

const router = useRouter();
const authState = useAuthStore();

const handleSignOut = async () => {
  await authState.signOut();
  router.push({ name: 'SignInPage' });
};

const navigateToHome = () => {
  router.push({ name: 'MainPage' });
};
</script>
