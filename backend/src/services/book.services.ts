import type { AxiosResponse } from 'axios';
import type { Book } from '@/types/book';
import type {
  AladinItemListQueryParams,
  AladinItemListResponse,
  AladinErrorResponse,
} from '@/types/aladinApi';
import { AladinFetchError } from '@/errors/AladinFetchError';
import axiosInstance from '@/services/axiosInstance';
import { ALADIN_API_ENDPOINTS } from '@/types/aladinApi';

export const getBooksService = async (params: AladinItemListQueryParams) => {
  const response: AxiosResponse<AladinItemListResponse | AladinErrorResponse> = await axiosInstance(
    ALADIN_API_ENDPOINTS.ITEM_LIST,
    {
      params: params as AladinItemListQueryParams,
    },
  );

  const { data } = response;

  if ('errorMessage' in data) {
    throw new AladinFetchError(404, data.errorMessage);
  }

  const processedBooks: Book[] = data.item.map((book) => ({
    title: book.title,
    author: book.author,
    pubDate: book.pubDate,
    description: book.description,
    isbn13: book.isbn13,
    publisher: book.publisher,
    cover: book.cover || '',
    link: book.link || '',
  }));

  const processedData: AladinItemListResponse = { ...data, item: processedBooks };

  return processedData;
};
