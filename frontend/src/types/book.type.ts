export interface Book {
  title: string;
  author: string;
  pubDate: Date;
  description: string;
  isbn13: string;
  publisher: string;
  cover?: string;
  link?: string;
}

export interface BookDetail extends Book {
  subInfo: {
    subTitle: string;
    originalTitle: string;
    itemPage: number;
  };
}

// 도서 리스트
export interface BooksQueryParams {
  queryType?: 'Bestseller' | 'ItemNewAll' | 'ItemNewSpecial' | 'BlogBest';
  start?: number;
  maxResults?: number;
}
export interface BooksResponse {
  message: string;
  data: BooksResponseData;
}

export interface BooksResponseData {
  title: string;
  itemsPerPage: number;
  startIndex: number;
  totalResults: number;
  books: Book[];
}

// 도서 검색
export interface BookSearchQueryParams {
  query: string;
  queryType?: 'keyword' | 'title' | 'author' | 'publisher';
  start?: number;
  maxResults?: number;
  sort?: 'accuracy' | 'publishTime' | 'title';
}

// 도서 상세
export interface BookDetailQueryParams {
  itemId: string;
  itemIdType?: 'isbn13' | 'isbn' | 'itemId';
}
