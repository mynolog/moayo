<template>
  <div class="w-full mt-5">
    <h3 class="text-xl font-semibold">{{ accountId }}님의 리뷰</h3>
    <ui-loading-spiner v-if="isReviewsLoading" />
    <ul v-else-if="reviewsData" class="w-full grid grid-cols-2 gap-5">
      <review-card v-for="review in reviewsData" :key="review._id" :review="review" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import ReviewCard from './ReviewCard.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useUserReviews } from '@/composables/useUserReviews';
import UiLoadingSpiner from '../ui/UiLoadingSpiner.vue';

const user = useAuthStore().getUser;
if (!user) {
  throw new Error('다시 로그인 해주세요.');
}
const { accountId } = user;

const { reviewsData, isReviewsLoading, reviewsError } = useUserReviews(user.accountId);
</script>
