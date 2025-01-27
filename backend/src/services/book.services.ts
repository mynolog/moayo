import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import type { Book } from '@/types/book';
import type {
  AladinItemListQueryParams,
  AladinItemListServiceResponse,
  AladinErrorResponse,
  AladinItemSearchQueryParams,
  AladinItemSearchResponse,
} from '@/types/aladinApi';
import { ALADIN_API_ENDPOINTS } from '@/types/aladinApi';
import aladinApi from '@/api/aladinApi';
import { AladinFetchError, AladinSearchError } from '@/errors/AladinApiError';

export const getBooksService = async (params: AladinItemListQueryParams) => {
  const config: AxiosRequestConfig<{
    params: AladinItemListQueryParams;
  }> = {
    params,
  };
  const response: AxiosResponse<AladinItemListServiceResponse | AladinErrorResponse> =
    await aladinApi(ALADIN_API_ENDPOINTS.ITEM_LIST, config);

  const { data } = response;

  if ('errorMessage' in data) {
    throw new AladinFetchError(404, data.errorMessage);
  }

  const { title, totalResults, startIndex, itemsPerPage, item } = data;

  const processedBooks: Book[] = item.map((book) => ({
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

export const getBooksByQueryService = async (params: AladinItemSearchQueryParams) => {
  const config: AxiosRequestConfig<{
    params: AladinItemSearchQueryParams;
  }> = {
    params,
  };
  const response: AxiosResponse<AladinItemListServiceResponse | AladinErrorResponse> =
    await aladinApi(ALADIN_API_ENDPOINTS.ITEM_SEARCH, config);

  const { data } = response;

  if ('errorMessage' in data) {
    throw new AladinFetchError(404, data.errorMessage);
  }

  const { title, totalResults, startIndex, itemsPerPage, item } = data;

  if (item.length === 0) {
    throw new AladinSearchError(404, '검색 결과가 존재하지 않습니다.');
  }

  const processedBooks: Book[] = item.map((book) => ({
    title: book.title,
    author: book.author,
    pubDate: book.pubDate,
    description: book.description,
    isbn13: book.isbn13,
    publisher: book.publisher,
    cover: book.cover || '',
    link: book.link || '',
  }));

  const processedData: AladinItemSearchResponse = {
    title,
    totalResults,
    startIndex,
    itemsPerPage,
    item: processedBooks,
  };

  return processedData;
};
