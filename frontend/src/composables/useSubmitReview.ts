import type { AxiosResponse } from 'axios';
import type {
  SubmitReviewResponse,
  SubmitReviewResponseData,
  SubmitReviewForm,
} from '@/types/review.type';
import { reactive, ref } from 'vue';
import api from '@/api/api';
import { ROUTES } from '@/router/apiRoutes';

export const useSubmitReview = () => {
  const data = reactive<SubmitReviewResponseData>({
    newReview: {
      _id: '',
      isbn13: '',
      accountId: '',
      title: '',
      rating: 0,
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const isLoading = ref(false);
  const error = ref<unknown | null>(null);

  const submitReview = async (isbn13: string, form: SubmitReviewForm) => {
    isLoading.value = true;
    error.value = null;

    try {
      const { data: responseData }: AxiosResponse<SubmitReviewResponse> = await api.post(
        ROUTES.BOOK_REVIEW(isbn13),
        form,
      );
      if (responseData.newReview) {
        Object.assign(data.newReview, responseData.newReview);
      }
    } catch (err) {
      error.value = err;
    }
  };

  return { data, isLoading, error, submitReview };
};
