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
import { watch, reactive } from 'vue';
import { useRoute } from 'vue-router';
import BookCard from './BookCard.vue';
import { useBooks } from '@/composables/useBooks';
import type { BooksQueryParams } from '@/types/book.type';

const route = useRoute();

// queryParams 관리
const queryParams = reactive<BooksQueryParams>({
  queryType: (route.query.queryType ?? 'Bestseller') as BooksQueryParams['queryType'],
  start: 1,
  maxResults: 20,
});
// useBooks 훅을 사용하여 데이터를 불러옴
const { data, initialLoading, loadMoreLoading, error, loadBooks } = useBooks(queryParams);

watch(
  () => route.query.queryType,
  (newQueryType) => {
    queryParams.queryType = (newQueryType ?? 'Bestseller') as BooksQueryParams['queryType'];
    loadBooks(true);
  },
);
</script>
