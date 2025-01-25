import type { Book } from './book';

export const ALADIN_API_ENDPOINTS = {
  // 도서 검색
  ITEM_SEARCH: '/ItemSearch.aspx',
  // 도서 리스트 조회
  ITEM_LIST: '/ItemList.aspx',
  // 도서 조회
  ITEM_LOOK_UP: '/ItemLookUp.aspx',
} as const;

export interface AladinApiDefaultParams {
  ttbKey: string;
  searchTarget: 'book' | 'ebook';
  inputEncoding: 'utf-8';
  output?: 'js' | 'xml';
  version?: string;
  cover?: 'big' | 'midBig' | 'mid' | 'small' | 'mini' | 'none';
  [key: string]: string | number | undefined;
}
// 도서 리스트 파라미터
export interface AladinApiItemListParams {
  queryType: 'Bestseller' | 'ItemNewAll' | 'ItemNewSpecial' | 'ItemEditorChoice' | 'BlogBest';
  start?: number;
  maxResults?: number;
}
// 도서 검색 파라미터
export interface AladinApiItemSearchParams {
  query: string;
  queryType?: 'keyword' | 'title' | 'author' | 'publisher';
  start?: number;
  maxResult?: number;
  sort?: 'accuracy' | 'publishTime' | 'title';
}

// 도서 상세 조회 파라미터
export interface AladinApiItemLookUpParams {
  itemId: string;
  itemIdType?: 'isbn13' | 'isbn' | 'itemId';
}

// 도서 리스트 응답
export interface AladinApiItemListResponse {
  title: string;
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  item: Book[];
}

export interface AladinApiErrorResponse {
  errorMessage: string;
}
