import type { AxiosResponse } from 'axios';
import type { BookReviewsResponse, BookReviewsResponseData } from '@/types/review.type';
import { reactive, ref, onMounted } from 'vue';
import api from '@/api/api';
import { ROUTES } from '@/router/apiRoutes';

export const useBookReviews = (isbn13: string) => {
  const data = reactive<BookReviewsResponseData>({
    reviews: [],
  });

  const isLoading = ref(false);
  const error = ref<unknown | null>(null);

  const loadBookReviews = async () => {
    isLoading.value = true;

    try {
      const { data: responseData }: AxiosResponse<BookReviewsResponse> = await api.get(
        ROUTES.BOOK_REVIEW(isbn13),
      );
      if (responseData.data.reviews.length > 0) {
        data.reviews.push(...responseData.data.reviews);
      }
    } catch (err) {
      console.error(err);
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    loadBookReviews();
  });

  return { reviewsData: data, isReviewsLoading: isLoading, reviewsError: error };
};
