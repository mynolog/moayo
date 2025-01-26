import type { AxiosResponse } from 'axios';
import type { Book } from '@/types/book';
import type {
  AladinItemListQueryParams,
  AladinItemListServiceResponse,
  AladinErrorResponse,
} from '@/types/aladinApi';
import { ALADIN_API_ENDPOINTS } from '@/types/aladinApi';
import aladinApi from '@/api/aladinApi';
import { AladinFetchError } from '@/errors/AladinFetchError';

export const getBooksService = async (params: AladinItemListQueryParams) => {
  const response: AxiosResponse<AladinItemListServiceResponse | AladinErrorResponse> =
    await aladinApi(ALADIN_API_ENDPOINTS.ITEM_LIST, {
      params: params as AladinItemListQueryParams,
    });

  const { data } = response;

  if ('errorMessage' in data) {
    throw new AladinFetchError(404, data.errorMessage);
  }

  const { title, totalResults, startIndex, itemsPerPage } = data;

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

  const processedData: AladinItemListServiceResponse = {
    title,
    totalResults,
    startIndex,
    itemsPerPage,
    item: processedBooks,
  };

  return processedData;
};
