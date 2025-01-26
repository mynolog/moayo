import type { Request, Response } from 'express';
import type { AladinItemListQueryParams } from '@/types/aladinApi';
import type { GetBooksResponse, GetBooksResponseData } from '@/types/book';
import type { ErrorResponse } from '@/types/error';
import { getBooksService } from '@/services/book.services';
import { AladinFetchError } from '@/errors/AladinFetchError';

export const getBooks = async (
  req: Request<{}, {}, {}, AladinItemListQueryParams>,
  res: Response<GetBooksResponse | ErrorResponse>,
) => {
  const queryType = (req.query.queryType as AladinItemListQueryParams['queryType']) || 'Bestseller';
  const start = (req.query.start as AladinItemListQueryParams['start']) || 1;
  const maxResults = (req.query.maxResults as AladinItemListQueryParams['maxResults']) || 10;
  const params: AladinItemListQueryParams = {
    queryType,
    start,
    maxResults,
  };
  try {
    const { title, totalResults, startIndex, itemsPerPage, item } = await getBooksService(params);

    const data: GetBooksResponseData = {
      title,
      totalResults,
      startIndex,
      itemsPerPage,
      books: item,
    };

    res.status(200).json({ message: '도서 리스트 불러오기에 성공했습니다.', data });
  } catch (error) {
    if (error instanceof AladinFetchError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({
        message: '도서 리스트를 불러오는 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  }
};
