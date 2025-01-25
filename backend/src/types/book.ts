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

export interface BookResponse {
  title: string;
  author: string;
  pubDate: Date;
  description: string;
  isbn: string;
  publisher: string;
  cover?: string;
  link?: string;
}
