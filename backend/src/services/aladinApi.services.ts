import type { AxiosResponse } from 'axios';
import type {
  AladinApiItemListParams,
  AladinApiItemListResponse,
  AladinApiErrorResponse,
} from '@/types/aladinApi';
import { AladinFetchError } from '@/errors/AladinApiFetchError';
import axiosInstance from '@/services/axiosInstance';
import { ALADIN_API_ENDPOINTS } from '@/types/aladinApi';

export const getBooksService = async (queryType: AladinApiItemListParams['queryType']) => {
  const response: AxiosResponse<AladinApiItemListResponse | AladinApiErrorResponse> =
    await axiosInstance(ALADIN_API_ENDPOINTS.ITEM_LIST, {
      params: {
        queryType,
        start: 1,
        maxResults: 15,
      } as AladinApiItemListParams,
    });

  const { data } = response;

  if ('errorMessage' in data) {
    throw new AladinFetchError(404, data.errorMessage);
  }

  return data as AladinApiItemListResponse;
};
