<template>
  <main-layout>
    <div v-if="data && data.bookDetail && !isLoading" class="w-full min-h-screen mx-auto">
      <!-- 도서 제목 -->
      <div class="sticky top-[55px] bg-background z-10 border-b border-gray-200">
        <div class="flex items-center gap-2 px-4 py-2">
          <h3 class="text-lg md:text-2xl font-bold">
            {{ formatTitle(data.bookDetail.title) }}
          </h3>
          <span
            v-show="data.bookDetail.subInfo.subTitle"
            class="text-sm md:text-md text-soft-blue-600"
          >
            - {{ data.bookDetail.subInfo.subTitle }}
          </span>
        </div>
      </div>

      <!-- 도서 저자, 출판사, 출간일, 원제목 -->
      <div class="relative flex flex-col overflow-visible px-4">
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

      <!-- 도서 리뷰 -->
      <div class="w-full grid grid-cols-[3fr_7fr] px-4 py-5">
        <h4 class="text-xl font-bold">짧은 리뷰</h4>

        <div class="flex flex-col gap-4">
          <form class="flex flex-col gap-4">
            <review-rating-picker />
            <review-textarea />
          </form>
          <div class="border-b border-gray-200 py-3"></div>

          <div v-if="reviewsData && reviewsData.reviews" class="w-full">
            <ul>
              <li
                v-for="review in reviewsData.reviews"
                class="w-full h-20 grid grid-cols-[3fr_7fr]"
              >
                <review-rating-viewer :reviewRating="review.rating" />
                <review-content-viewer
                  v-show="review.content"
                  :reviewContent="review.content"
                  :reviewAuthor="review.accountId"
                />
              </li>
            </ul>
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
import { useBookReviews } from '@/composables/useBookReviews';
import ReviewRatingPicker from '@/components/review/ReviewRatingPicker.vue';
import ReviewTextarea from '@/components/review/ReviewTextarea.vue';
import ReviewRatingViewer from '@/components/review/ReviewRatingViewer.vue';
import ReviewContentViewer from '@/components/review/ReviewContentViewer.vue';

const route = useRoute();
const isbn13 = route.params.isbn13 as string;

const { data, isLoading, error } = useBookDetail(isbn13);

const { reviewsData, isReviewsLoading, reviewsError } = useBookReviews(isbn13);

const formatTitle = (title: string) => {
  return title.split(' - ')[0];
};
</script>
