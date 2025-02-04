<template>
  <form class="flex flex-col gap-4" @submit.prevent="handleSubmitReviewForm">
    <div class="flex gap-1 items-center">
      <span
        v-for="n in 5"
        :key="`${n} - ratingPicker`"
        @mouseover="hoverRating = n"
        @mouseleave="hoverRating = 0"
        @click="selectedRating = n"
        class="hover:cursor-pointer text-lg"
      >
        <font-awesome-icon
          :icon="n <= (hoverRating || selectedRating) ? faStarSolid : faStarRegular"
          class="text-soft-blue-600 hover:text-soft-blue-900"
        />
      </span>
    </div>
    <div class="w-full h-20 grid grid-cols-[9fr_1fr] gap-2">
      <textarea
        v-model="form.content"
        placeholder="리뷰를 남겨주세요. 부적절한 내용은 삭제될 수 있습니다."
        class="resize-none p-2 outline-none border-2 border-white focus:border-gray-800"
      ></textarea>
      <ui-button
        type="submit"
        className="font-bold bg-soft-blue-800"
        :disabled="!form.rating || !form.content || form.content.length < 10"
      >
        <span v-if="!isSubmitting">등록</span>
        <ui-loading-spiner v-else />
      </ui-button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import UiButton from '@/components/ui/UiButton.vue';
import { useCreateBookReview } from '@/composables/useCreateBookReview';
import { useRoute } from 'vue-router';
import UiLoadingSpiner from '../ui/UiLoadingSpiner.vue';

const selectedRating = ref(0);
const hoverRating = ref(0);

const form = reactive({
  rating: 0,
  content: '',
});

const route = useRoute();
const isbn13 = route.params.isbn13 as string;

//TODO: 생성 에러 핸들링 추가
const { mutation, isSubmitting } = useCreateBookReview(isbn13);

const handleSubmitReviewForm = async () => {
  try {
    // mutation으로 리뷰 생성
    await mutation.mutateAsync({ isbn13, form });
    form.content = '';
    selectedRating.value = 0;
  } catch (error) {
    console.error('리뷰 제출 실패:', error);
  }
};

watch(selectedRating, (newRating) => (form.rating = newRating));
</script>
