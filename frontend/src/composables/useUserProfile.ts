import type { AxiosResponse } from 'axios';
import api from '@/api/api';
import { ROUTES } from '@/router/apiRoutes';
import { useQuery } from '@tanstack/vue-query';
import type { UserProfileResponse } from '@/types/user.type';

export const useUserProfile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response: AxiosResponse<UserProfileResponse> = await api.get(ROUTES.MY_PROFILE);
      return response.data.userProfile;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  return { userProfileData: data, isUserProfileLoading: isLoading, userProfileError: error };
};
