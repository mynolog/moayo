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

export interface GetBooksResponseData {
  title: string;
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  books: Book[];
}
export interface GetBooksResponse {
  message: string;
  data: GetBooksResponseData;
}

export interface GetBooksByQueryResponseData {
  title: string;
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  books: Book[];
}
export interface GetBooksByQueryResponse {
  message: string;
  data: GetBooksByQueryResponseData;
}

export interface GetBookByIsbnResponseData {
  bookDetail: BookDetail;
}
export interface GetBookByIsbnResponse {
  message: string;
  data: GetBookByIsbnResponseData;
}
