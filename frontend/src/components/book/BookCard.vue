<template>
  <li
    class="w-[17rem] p-3 z-1 border-4 border-transparent rounded-lg hover:border-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:shadow-lg hover:scale-105 hover:z-10 transition-all duration-150 ease-linear cursor-pointer"
    @click="navigateToBookDetail(book.isbn13)"
  >
    <img v-if="book.cover" :src="book.cover" class="object-cover object-top h-56 w-full" />
    <!-- TODO: book.cover가 falsy일 경우 기본 이미지 처리 필요 -->
    <router-link :to="`/books/${book.isbn13}`">
      <p class="font-bold text-md overflow-hidden text-ellipsis whitespace-nowrap">
        {{ formatTitle(book.title) }}
      </p>
      <div class="text-xs text-gray-500">
        <p class="overflow-hidden text-ellipsis whitespace-nowrap">{{ book.author }}</p>
        <p>{{ book.publisher }}</p>
        <p>{{ book.pubDate }}</p>
      </div>
    </router-link>
  </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import type { Book } from '@/types/book.type';

const { book } = defineProps({
  book: {
    type: Object as PropType<Book>,
    required: true,
  },
});

const router = useRouter();

const navigateToBookDetail = (isbn13: string) => {
  router.push({ name: 'BookDetail', params: { isbn13 } });
};

const formatTitle = (title: string) => {
  return title.split(' - ')[0];
};
</script>
