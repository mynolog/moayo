<template>
  <li
    v-for="tab in tabList"
    :key="tab.id"
    class="text-md px-3 py-1 font-bold border-4 border-transparent rounded-lg hover:border-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:shadow-lg hover:scale-105 hover:z-10 transition-all duration-150 ease-linear cursor-pointer"
    @click="navigateToBookList(tab.queryType)"
  >
    <router-link :to="`?queryType=${tab.queryType}`" class="w-full h-full">
      {{ tab.name }}
    </router-link>
  </li>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { tabList } from '@/constants/tabList';
import type { BooksQueryParams } from '@/types/book.type';
import { scrollToTop } from '@/utils/utils';

const router = useRouter();

const navigateToBookList = async (queryType: BooksQueryParams['queryType']) => {
  await router.push({ name: 'MainPage', query: { queryType } });
  scrollToTop();
};
</script>
