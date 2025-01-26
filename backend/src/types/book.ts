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
