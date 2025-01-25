import { Request, Response } from 'express';
import { AladinFetchError } from '@/errors/AladinApiFetchError';
import { getBooksService } from '@/services/aladinApi.services';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const result = await getBooksService('Bestseller');

    res.status(200).json({ message: '도서 리스트 불러오기에 성공했습니다.', result });
  } catch (error) {
    if (error instanceof AladinFetchError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: '도서 리스트를 불러오는 중 오류가 발생했습니다.' });
    }
  }
};
