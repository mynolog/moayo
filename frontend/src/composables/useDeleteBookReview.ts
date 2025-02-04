import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import api from '@/api/api';
import { ROUTES } from '@/router/apiRoutes';
import { useBookReviews } from './useBookReviews';

interface DeleteReviewData {
  _id: string;
}

export const useDeleteBookReview = (isbn13: string) => {
  const isDeleting = ref(false);
  const error = ref<unknown | null>(null);

  const { refetch: refetchReviews } = useBookReviews(isbn13);

  const deleteReview = async ({
    isbn13,
    data,
  }: {
    isbn13: string;
    data: DeleteReviewData;
  }): Promise<any> => {
    try {
      const { data: responseData } = await api.delete(ROUTES.BOOK_REVIEW(isbn13), {
        data,
      });
      return responseData;
    } catch (err) {
      error.value = err;
      throw err;
    }
  };

  const mutation = useMutation({
    mutationFn: ({ isbn13, data }: { isbn13: string; data: DeleteReviewData }) =>
      deleteReview({ isbn13, data }),
    onMutate: () => {
      // 요청 즉시 호출
      isDeleting.value = true;
    },
    onSuccess: () => {
      // 요청 완료(성공)
      isDeleting.value = false;
      refetchReviews();
    },
    onError: (err) => {
      // 요청 처리 중 에러 발생
      isDeleting.value = false;
      error.value = err;
    },
    onSettled: () => {
      // 요청 후 항상 실행 (finally)
    },
  });

  return { mutation, isDeleting, error };
};
