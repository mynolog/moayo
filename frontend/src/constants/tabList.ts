import type { BooksQueryParams } from '@/types/book.type';

interface TabList {
  id: number;
  name: string;
  queryType: BooksQueryParams['queryType'];
}

export const tabList: TabList[] = [
  {
    id: 2000,
    name: '베스트셀러',
    queryType: 'Bestseller',
  },
  {
    id: 2001,
    name: '새로 나온 책',
    queryType: 'ItemNewAll',
  },
  {
    id: 2002,
    name: '주목할만한 새 책',
    queryType: 'ItemNewSpecial',
  },
  {
    id: 2003,
    name: '블로거 추천 도서',
    queryType: 'BlogBest',
  },
];
