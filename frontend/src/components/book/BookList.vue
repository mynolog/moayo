<template>
  <ul
    v-if="data && data.books"
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center"
  >
    <book-card v-for="book in data.books" :key="book.isbn13" :book="book" />
  </ul>

  <div v-else-if="isLoading">도서 목록 불러오는 중...</div>
  <div v-else-if="error">도서 목록 불러오는 중 에러 발생..!</div>
</template>

<script setup lang="ts">
import BookCard from './BookCard.vue';
import { useBooks } from '@/composables/useBooks';

const { data, isLoading, error } = useBooks();
</script>
