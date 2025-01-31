import type { Request, Response } from 'express';
import type {
  AladinItemListQueryParams,
  AladinItemLookUpParams,
  AladinItemLookUpQueryParams,
  AladinItemSearchQueryParams,
} from '@/types/aladinApi';
import type {
  GetBookByIsbnResponse,
  GetBookByIsbnResponseData,
  GetBooksByQueryResponse,
  GetBooksByQueryResponseData,
  GetBooksResponse,
  GetBooksResponseData,
} from '@/types/book';
import type { ErrorResponse } from '@/types/error';
import {
  getBookByIsbnService,
  getBooksByQueryService,
  getBooksService,
} from '@/services/book.services';
import { AladinFetchError, AladinSearchError } from '@/errors/AladinApiError';

// 도서 리스트 조회
export const getBooks = async (
  req: Request<{}, {}, {}, AladinItemListQueryParams>,
  res: Response<GetBooksResponse | ErrorResponse>,
) => {
  const { queryType = 'Bestseller', start = '1', maxResults = '10' } = req.query;

  const params: AladinItemListQueryParams = {
    queryType,
    start: parseInt(start as string, 10),
    maxResults: parseInt(maxResults as string, 10),
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

// 도서 상세 정보 조회
export const getBookByIsbn = async (
  req: Request<AladinItemLookUpParams, {}, {}, AladinItemLookUpQueryParams>,
  res: Response<GetBookByIsbnResponse | ErrorResponse>,
) => {
  const { isbn13 } = req.params;
  if (isbn13.length !== 13) {
    res.status(400).json({ message: '도서 ISBN 번호는 13자리로 입력해주세요.' });
  }
  const { itemIdType = 'isbn13' } = req.query;

  const params: AladinItemLookUpQueryParams = {
    itemId: isbn13,
    itemIdType,
  };

  try {
    // getBookByIsbnService의 반환 형태가 BookDetail[]이어서 객체 바로 사용하기 위한 배열 구조분해할당
    const [bookDetail] = await getBookByIsbnService(params);

    const data: GetBookByIsbnResponseData = {
      bookDetail: bookDetail,
    };

    res
      .status(200)
      .json({ message: `${data.bookDetail.title}의 상세 정보 불러오기에 성공했습니다.`, data });
  } catch (error) {
    if (error instanceof AladinSearchError) {
      res.status(error.statusCode).json({ message: '존재하지 않는 도서 ISBN 번호입니다.' });
    } else {
      res.status(500).json({
        message:
          '도서 상세 정보를 불러오는 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  }
};
