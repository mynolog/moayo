import type { UserReviewsResponse } from '@/types/user.type';
import { useQuery } from '@tanstack/vue-query';
import api from '@/api/api';
import { ROUTES } from '@/router/apiRoutes';

export const useUserReviews = (accountId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userReviews', accountId],
    queryFn: async () => {
      const { data: responseData } = await api.get<UserReviewsResponse>(ROUTES.MY_REVIEWS);
      return responseData.data.reviews;
    },
    staleTime: 300000,
    refetchOnWindowFocus: false,
  });

  return { reviewsData: data, isReviewsLoading: isLoading, reviewsError: error };
};
