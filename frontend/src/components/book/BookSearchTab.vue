<template>
  <div class="sticky w-full top-1 text-gray-500">
    <ui-input
      v-model="queryParams.query"
      class="border-gray-400 w-[600px]"
      placeholder="도서 제목 또는 저자를 입력하세요"
      @focus="isDropdownVisible = true"
      @blur="hideDropdown"
    />

    <div
      class="absolute top-4 right-3 hover:cursor-pointer hover:text-black transition-colors duration-150 ease-in-out"
    >
      <font-awesome-icon :icon="faMagnifyingGlass" />
    </div>

    <ul
      v-if="isDropdownVisible && searchData.books.length"
      class="absolute left-0 w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-sm overflow-hidden z-50"
    >
      <li
        v-for="book in searchData.books"
        :key="book.isbn13"
        class="w-full flex gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer items-center h-[50px] box-border"
        @click="navigateToBookDetail(book.isbn13)"
      >
        <div class="w-[30px] h-[40px] mr-5 overflow-hidden flex-shrink-0">
          <img :src="book.cover" class="w-full h-full object-cover" />
        </div>

        <span class="overflow-hidden overflow-ellipsis whitespace-nowrap">{{ book.title }}</span>
      </li>
    </ul>

    <div v-if="isLoading" class="absolute left-0 w-full mt-1 text-sm text-gray-500">검색 중...</div>

    <div v-if="error" class="absolute left-0 w-full mt-1 text-sm text-red-500">
      검색 중 오류 발생
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import UiInput from '../ui/UiInput.vue';
import { useBookSearch } from '@/composables/useBookSearch';

const { queryParams, searchData, isLoading, error, isDropdownVisible, hideDropdown } =
  useBookSearch();

const router = useRouter();

const navigateToBookDetail = (isbn13: string) => {
  router.push({ name: 'BookDetail', params: { isbn13 } });
};
</script>
