<template>
  <form class="flex flex-col gap-4">
    <review-rating-picker
      v-model:hoverRating="hoverRating"
      v-model:selectedRating="selectedRating"
    />
    <review-textarea v-model:content="form.content" @submit="submitReview(isbn13, form)" />
  </form>
  <div class="border-b border-gray-200 py-3"></div>
</template>

<script setup lang="ts">
import type { SubmitReviewForm } from '@/types/review.type';
import { ref, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
import ReviewRatingPicker from './ReviewRatingPicker.vue';
import ReviewTextarea from './ReviewTextarea.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useSubmitReview } from '@/composables/useSubmitReview';

const selectedRating = ref(0);
const hoverRating = ref(0);
const user = useAuthStore().getUser;

const { params } = useRoute();
const isbn13 = params.isbn13 as string;

if (!user) {
  throw new Error('다시 로그인 해주세요.');
}

const form = reactive<SubmitReviewForm>({
  accountId: user.accountId,
  rating: 0,
  content: '',
});

const { isLoading, error, submitReview } = useSubmitReview();

watch(selectedRating, (newRating) => {
  form.rating = newRating;
});
</script>
