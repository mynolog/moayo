import type { Request, Response } from 'express';
import type { AladinItemListQueryParams, AladinItemSearchQueryParams } from '@/types/aladinApi';
import type {
  GetBooksByQueryResponse,
  GetBooksByQueryResponseData,
  GetBooksResponse,
  GetBooksResponseData,
} from '@/types/book';
import type { ErrorResponse } from '@/types/error';
import { getBooksByQueryService, getBooksService } from '@/services/book.services';
import { AladinFetchError, AladinSearchError } from '@/errors/AladinApiError';

// 도서 리스트 조회
export const getBooks = async (
  req: Request<{}, {}, {}, AladinItemListQueryParams>,
  res: Response<GetBooksResponse | ErrorResponse>,
) => {
  const { queryType = 'Bestseller', start = 1, maxResults = 10 } = req.query;
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
// 도서 검색
export const getBooksByQuery = async (
  req: Request<{}, {}, {}, AladinItemSearchQueryParams>,
  res: Response<GetBooksByQueryResponse | ErrorResponse>,
) => {
  const { query, queryType = 'keyword', start = 1, maxResult = 10, sort = 'accuracy' } = req.query;
  const params: AladinItemSearchQueryParams = {
    query,
    queryType,
    start,
    maxResult,
    sort,
  };
  try {
    const { title, totalResults, startIndex, itemsPerPage, item } =
      await getBooksByQueryService(params);

    const data: GetBooksByQueryResponseData = {
      title,
      totalResults,
      startIndex,
      itemsPerPage,
      books: item,
    };

    res
      .status(200)
      .json({ message: `${query}와 연관된 도서 리스트 불러오기에 성공했습니다.`, data });
  } catch (error) {
    if (error instanceof AladinFetchError) {
      res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof AladinSearchError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({
        message: '도서 리스트를 불러오는 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  }
};
