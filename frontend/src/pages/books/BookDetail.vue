<template>
  <main-layout>
    <div v-if="data && data.bookDetail && !isLoading" class="w-full min-h-screen mx-auto">
      <!-- 도서 제목 -->
      <div class="sticky top-[55px] bg-background z-10 border-b border-gray-200">
        <div class="flex items-center gap-2 px-4 py-2">
          <h3 class="text-lg md:text-2xl font-bold">
            {{ formatTitle(data.bookDetail.title) }}
          </h3>
          <span v-show="data.bookDetail.subInfo.subTitle" class="text-sm md:text-lg text-mint-900">
            - {{ data.bookDetail.subInfo.subTitle }}
          </span>
        </div>
      </div>

      <div class="relative flex flex-col overflow-visible px-4">
        <!-- 도서 저자, 출판사, 출간일, 원제목 -->
        <div class="grid md:grid-cols-3 grid-cols-1 gap-5 mt-6 pb-6 border-b border-gray-200">
          <div class="flex flex-col gap-4 text-sm text-gray-600 w-full">
            <div class="grid grid-cols-[2fr_8fr]">
              <span class="font-semibold">저자</span>
              <span class="text-md">{{ data.bookDetail.author }}</span>
            </div>
            <div class="grid grid-cols-[2fr_8fr]">
              <span class="font-semibold">출판사</span>
              <span>{{ data.bookDetail.publisher }}</span>
            </div>
            <div class="grid grid-cols-[2fr_8fr]">
              <span class="font-semibold">출판일</span>
              <span>{{ data.bookDetail.pubDate }}</span>
            </div>
            <div class="grid grid-cols-[2fr_8fr]">
              <span class="font-semibold">ISBN</span>
              <span>{{ data.bookDetail.isbn13 }}</span>
            </div>
            <div v-show="data.bookDetail.subInfo.originalTitle" class="grid grid-cols-[2fr_8fr]">
              <span class="font-semibold">원제목</span>
              <span class="break-words">
                {{ data.bookDetail.subInfo.originalTitle }}
              </span>
            </div>
            <div class="grid grid-cols-[2fr_8fr]">
              <span class="font-semibold">알라딘</span>
              <a :href="data.bookDetail.link" target="_blank">종이책</a>
            </div>
          </div>
          <div class="w-full md:w-auto">
            <img :src="data.bookDetail.cover" class="md:w-auto mx-auto" />
          </div>
          <div class="w-full md:w-auto break-words whitespace-normal">
            <span>{{ data.bookDetail.description }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isLoading">도서 정보 불러오는 중..</div>
    <div v-else-if="error">도서 정보 불러오는 중 에러 발생</div>
  </main-layout>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import { useBookDetail } from '@/composables/useBookDetail';

const route = useRoute();
const isbn13 = route.params.isbn13 as string;

const { data, isLoading, error } = useBookDetail(isbn13);

const formatTitle = (title: string) => {
  return title.split(' - ')[0];
};
</script>
