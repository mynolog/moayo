import type { Book } from './book';

export const ALADIN_API_ENDPOINTS = {
  // 도서 검색
  ITEM_SEARCH: '/ItemSearch.aspx',
  // 도서 리스트 조회
  ITEM_LIST: '/ItemList.aspx',
  // 도서 조회
  ITEM_LOOK_UP: '/ItemLookUp.aspx',
} as const;

// 에러 응답
export interface AladinErrorResponse {
  errorMessage: string;
}

// 공통 쿼리
export interface AladinDefaultQueryParams {
  ttbKey: string;
  searchTarget: 'book' | 'ebook';
  inputEncoding: 'utf-8';
  output?: 'js' | 'xml';
  version?: string;
  cover?: 'big' | 'midBig' | 'mid' | 'small' | 'mini' | 'none';
  [key: string]: string | number | undefined;
}
// 도서 리스트 쿼리
export interface AladinItemListQueryParams {
  queryType: 'Bestseller' | 'ItemNewAll' | 'ItemNewSpecial' | 'BlogBest';
  start?: number;
  maxResults?: number;
}
// 도서 리스트 응답
export interface AladinItemListResponse {
  title: string;
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  item: Book[];
}

// 도서 검색 파라미터
export interface AladinItemSearchQueryParams {
  query: string;
  queryType?: 'keyword' | 'title' | 'author' | 'publisher';
  start?: number;
  maxResult?: number;
  sort?: 'accuracy' | 'publishTime' | 'title';
  [key: string]: string | number | undefined;
}
// 도서 검색 응답
export interface AladinItemSearchResponse {}

// 도서 상세 조회 파라미터
export interface AladinItemLookUpQueryParams {
  itemId: string;
  itemIdType?: 'isbn13' | 'isbn' | 'itemId';
  [key: string]: string | number | undefined;
}
// 도서 상세 조회 응답
export interface AladinItemLookUpResponse {}
