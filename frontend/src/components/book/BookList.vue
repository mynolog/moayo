<template>
  <ul
    v-if="data && data.books"
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center"
  >
    <!-- 초기 로딩 시 스켈레톤 UI -->
    <li
      v-if="initialLoading"
      v-for="index in 12"
      :key="index"
      class="w-[17rem] h-[295px] p-3 z-1 border-4 border-transparent rounded-lg bg-gray-200 animate-pulse"
    ></li>

    <!-- 실제 데이터 -->
    <book-card v-for="book in data.books" :key="book.isbn13" :book="book" />

    <!-- 추가 로딩 중일 때 스켈레톤 UI -->
    <li
      v-if="loadMoreLoading"
      v-for="index in 4"
      :key="'loading-' + index"
      class="w-[17rem] h-[295px] p-3 z-1 border-4 border-transparent rounded-lg bg-gray-200 animate-pulse"
    ></li>
  </ul>

  <div v-else-if="error">도서 목록 불러오는 중 에러 발생..!</div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import BookCard from './BookCard.vue';
import { useBooks } from '@/composables/useBooks';
import { useTabStore } from '@/stores/book.store';

const tabStore = useTabStore();

// queryParams 관리
const queryParams = ref({
  queryType: tabStore.selectedTab,
  start: 1,
  maxResults: 20,
});

// useBooks 훅을 사용하여 데이터를 불러옴
const { data, initialLoading, loadMoreLoading, error, loadBooks } = useBooks(queryParams.value);

// 탭 변경 시, queryType을 변경하고 데이터 새로 불러오기
watch(
  () => tabStore.selectedTab,
  (newTab) => {
    queryParams.value.queryType = newTab;
    loadBooks(true); // 초기화 후 새로 불러오기
  },
);
</script>
