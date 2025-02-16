import { useQuery } from '@tanstack/vue-query';
import api from '@/api/api';
import type { BookReviewsResponse } from '@/types/review.type';
import { ROUTES } from '@/router/apiRoutes';

export const useBookReviews = (isbn13: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['bookReviews', isbn13],
    queryFn: async () => {
      const { data: responseData } = await api.get<BookReviewsResponse>(ROUTES.BOOK_REVIEW(isbn13));
      return responseData.data.reviews;
    },
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });

  return { reviewsData: data, isReviewsLoading: isLoading, reviewsError: error, refetch };
};
