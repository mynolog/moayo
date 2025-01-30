import type { AxiosResponse, AxiosRequestConfig } from 'axios';
import type { Book, BookDetail } from '@/types/book';
import type {
  AladinItemListQueryParams,
  AladinItemListServiceResponse,
  AladinErrorResponse,
  AladinItemSearchQueryParams,
  AladinItemSearchServiceResponse,
  AladinItemLookUpQueryParams,
  AladinItemLookUpServiceResponse,
} from '@/types/aladinApi';
import { ALADIN_API_ENDPOINTS } from '@/types/aladinApi';
import aladinApi from '@/api/aladinApi';
import { AladinFetchError, AladinSearchError } from '@/errors/AladinApiError';

export const getBooksService = async (params: AladinItemListQueryParams) => {
  const response: AxiosResponse<AladinItemListServiceResponse | AladinErrorResponse> =
    await aladinApi(ALADIN_API_ENDPOINTS.ITEM_LIST, {
      params,
    });

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

  const processedData: AladinItemSearchServiceResponse = {
    title,
    totalResults,
    startIndex,
    itemsPerPage,
    item: processedBooks,
  };

  return processedData;
};

export const getBookByIsbnService = async (params: AladinItemLookUpQueryParams) => {
  const config: AxiosRequestConfig<{
    params: AladinItemLookUpQueryParams;
  }> = {
    params,
  };

  const response: AxiosResponse<AladinItemLookUpServiceResponse | AladinErrorResponse> =
    await aladinApi(ALADIN_API_ENDPOINTS.ITEM_LOOK_UP, config);
  const { data } = response;

  if ('errorMessage' in data) {
    throw new AladinSearchError(404, data.errorMessage);
  }

  const { item } = data;

  const processedBookDetail: BookDetail[] = item.map((detail) => ({
    title: detail.title,
    author: detail.author,
    pubDate: detail.pubDate,
    description: detail.description,
    isbn13: detail.isbn13,
    publisher: detail.publisher,
    cover: detail.cover,
    link: detail.link,
    subInfo: {
      subTitle: detail.subInfo.subTitle,
      originalTitle: detail.subInfo.originalTitle,
      itemPage: detail.subInfo.itemPage,
    },
  }));

  return processedBookDetail;
};
