<template>
  <li
    class="w-full min-h-[130px] bg-white p-3 flex flex-col justify-between rounded-sm hover:border-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:shadow-lg hover:scale-105 hover:z-10 transition-all duration-150 ease-linear cursor-pointer"
    @click="navigateToBookDetail(review.isbn13)"
  >
    <review-rating-viewer :reviewRating="review.rating" />
    <p>{{ review.content }}</p>
    <div class="flex items-center gap-5 text-xs text-gray-500">
      <span>{{ review.accountId }}</span>
      <div class="flex gap-2">
        <span>{{ formatDateKR(review.createdAt) }}</span>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { BookReview } from '@/types/review.type';
import ReviewRatingViewer from '../review/ReviewRatingViewer.vue';
import { formatDateKR } from '@/utils/utils';
import { useRouter } from 'vue-router';

const { review } = defineProps({
  review: {
    type: Object as PropType<BookReview>,
    required: true,
  },
});

const router = useRouter();

const navigateToBookDetail = (isbn13: string) => {
  router.push({ name: 'BookDetail', params: { isbn13 } });
};
</script>
