import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import api from '@/api/api';
import { ROUTES } from '@/router/apiRoutes';
import { useBookReviews } from './useBookReviews';

interface UpdateReviewForm {
  _id: string;
  content?: string;
  rating?: number;
}

export const useUpdateBookReview = (isbn13: string) => {
  const isUpdating = ref(false);
  const error = ref<unknown | null>(null);

  const { refetch: refetchReviews } = useBookReviews(isbn13);

  const updateReview = async ({
    isbn13,
    form,
  }: {
    isbn13: string;
    form: UpdateReviewForm;
  }): Promise<any> => {
    try {
      const { data: responseData } = await api.patch(ROUTES.BOOK_REVIEW(isbn13), form);
      return responseData;
    } catch (err) {
      error.value = err;
      throw err;
    }
  };

  const mutation = useMutation({
    mutationFn: ({ isbn13, form }: { isbn13: string; form: UpdateReviewForm }) =>
      updateReview({ isbn13, form }),
    onMutate: () => {
      // 요청 즉시 호출
      isUpdating.value = true;
    },
    onSuccess: () => {
      // 요청 완료(성공)
      isUpdating.value = false;
      refetchReviews();
    },
    onError: (err) => {
      // 요청 처리 중 에러 발생
      isUpdating.value = false;
      error.value = err;
    },
    onSettled: () => {
      // 요청 후 항상 실행 (finally)
    },
  });

  return { mutation, isUpdating, error };
};
