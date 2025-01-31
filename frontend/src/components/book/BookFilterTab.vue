<template>
  <li
    v-for="tab in tabList"
    :key="tab.id"
    class="text-md px-3 py-1 font-bold border-4 border-transparent rounded-lg hover:border-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:shadow-lg hover:scale-105 hover:z-10 transition-all duration-150 ease-linear cursor-pointer"
    @click="handleChangeTab(tab.queryType)"
  >
    {{ tab.name }}
  </li>
</template>

<script setup lang="ts">
import type { TabState } from '@/stores/book.store';
import { useTabStore } from '@/stores/book.store';
import { tabList } from '@/constants/tabList';

const tabState = useTabStore();

const handleChangeTab = async (tab: TabState['activeTab']) => {
  await tabState.setTab(tab);
  scrollToTop();
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>
