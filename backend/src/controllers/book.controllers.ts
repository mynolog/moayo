import { Request, Response } from 'express';
import { AladinApiItemListParams, AladinApiItemListResponse } from '@/types/aladinApi';
import { AladinFetchError } from '@/errors/AladinApiFetchError';
import { getBooksService } from '@/services/book.services';

export const getBooks = async (req: Request, res: Response) => {
  const queryType = (req.query.queryType as AladinApiItemListParams['queryType']) || 'Bestseller';
  const start = (req.query.start as AladinApiItemListParams['start']) || 1;
  const maxResults = (req.query.maxResults as AladinApiItemListParams['maxResults']) || 10;
  const params: AladinApiItemListParams = {
    queryType,
    start,
    maxResults,
  };
  try {
    const response = await getBooksService(params);

    const result: AladinApiItemListResponse = {
      title: response.title,
      totalResults: response.totalResults,
      startIndex: response.startIndex,
      itemsPerPage: response.itemsPerPage,
      item: response.item,
    };

    res.status(200).json({ message: '도서 리스트 불러오기에 성공했습니다.', result });
  } catch (error) {
    if (error instanceof AladinFetchError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: '도서 리스트를 불러오는 중 오류가 발생했습니다.', error });
    }
  }
};
