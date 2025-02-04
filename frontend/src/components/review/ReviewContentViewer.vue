<template>
  <div class="w-full h-full flex flex-col items-start mt-1 gap-3">
    <div class="w-full flex justify-between pr-2">
      <div v-if="!isUpdating" class="w-full flex justify-between pr-2">
        <p v-if="!isEditMode" class="text-sm">{{ review.content }}</p>
        <textarea
          v-else
          ref="textareaRef"
          v-model="form.content"
          class="w-full text-sm resize-none rounded-sm border-2 bg-background focus:border-black outline-none p-1"
          >{{ form.content }}</textarea
        >
      </div>

      <ui-loading-spiner v-if="isUpdating || isDeleting" />

      <div v-show="user && user._id === review.user_id" class="flex gap-3 text-gray-500 pl-10">
        <span class="hover:cursor-pointer hover:text-mint-600">
          <font-awesome-icon
            v-if="!isEditMode"
            :icon="faPenToSquare"
            @click="handleSwitchToEditMode"
          />
          <font-awesome-icon v-else :icon="faCheck" @click="handleSubmitReviewForm" />
        </span>
        <span class="hover:cursor-pointer hover:text-red-500">
          <font-awesome-icon v-if="!isEditMode" :icon="faTrashCan" @click="handleDeleteReview" />
          <font-awesome-icon v-else :icon="faXmark" @click="handleSwitchToViewMode" />
        </span>
      </div>
    </div>
    <div v-show="!isEditMode" class="flex items-center gap-5 text-xs text-gray-500">
      <span>{{ review.accountId }}</span>
      <div class="flex gap-2">
        <span>{{ formatDateKR(review.createdAt) }}</span>
        <span v-if="review.updatedAt !== review.createdAt">수정된 리뷰</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { BookReview } from '@/types/review.type';
import { ref, reactive, nextTick, watch } from 'vue';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { formatDateKR } from '@/utils/utils';
import { useAuthStore } from '@/stores/auth.store';
import { useUpdateBookReview } from '@/composables/useUpdateBookReview';
import { useDeleteBookReview } from '@/composables/useDeleteBookReview';
import { useRoute } from 'vue-router';
import UiLoadingSpiner from '../ui/UiLoadingSpiner.vue';

const { review } = defineProps({
  review: {
    type: Object as PropType<BookReview>,
    required: true,
  },
});

const user = useAuthStore().getUser;
const textareaRef = ref<HTMLTextAreaElement | null>(null);
const isEditMode = ref(false);
const form = reactive({
  _id: review._id,
  content: review.content,
  rating: review.rating,
});
const route = useRoute();
const isbn13 = route.params.isbn13 as string;

//TODO: 수정, 삭제 에러 핸들링 추가
const { mutation: updateMutation, isUpdating } = useUpdateBookReview(isbn13);
const { mutation: deleteMutation, isDeleting } = useDeleteBookReview(isbn13);

const focusTextarea = () => {
  if (textareaRef.value) {
    const contentLength = textareaRef.value.value.length;
    textareaRef.value.focus();
    textareaRef.value.setSelectionRange(contentLength, contentLength);
  }
};

const handleSwitchToEditMode = async () => {
  isEditMode.value = true;
  await nextTick();
  focusTextarea();
};

const handleSwitchToViewMode = async () => {
  form.content = review.content;
  isEditMode.value = false;
  await nextTick();
};

const handleSubmitReviewForm = async () => {
  try {
    await updateMutation.mutateAsync({ isbn13, form });
    isEditMode.value = false;
  } catch (error) {
    console.error('리뷰 수정 실패', error);
  }
};

const handleDeleteReview = async () => {
  try {
    await deleteMutation.mutateAsync({ isbn13, data: { _id: review._id } });
  } catch (error) {
    console.error('리뷰 삭제 실패', error);
  }
};

// review 등록 시 form 업데이트
watch(
  () => review,
  (newReview) => {
    form._id = newReview._id;
    form.content = newReview.content;
    form.rating = newReview.rating;
  },
);
</script>
