import type { CreateReviewBody, ReviewBody, ReviewParams } from '@/types/review';
import type { Request, Response } from 'express';
import type { AuthRequest } from '@/types/express';
import { ReviewError } from '@/errors/ReviewError';
import { createReviewService, getReviewsByIsbnService } from '@/services/review.services';
// 리뷰 생성 - Create
export const createReview = async (
  req: AuthRequest<ReviewParams, {}, ReviewBody>,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(403).json({ message: '인증되지 않은 사용자입니다.' });
    return;
  }

  const { isbn13 } = req.params;
  const { rating, content } = req.body;
  const { _id, accountId } = req.user;

  const newReviewBody: CreateReviewBody = {
    rating,
    content,
    user_id: _id,
    accountId,
    isbn13,
  };

  if (!isbn13 || !rating || !content) {
    res.status(400).json({ message: '필수 값이 누락되었습니다.' });
    return;
  }

  try {
    const response = await createReviewService(req.params, newReviewBody);

    res.status(201).json({ message: '리뷰가 정상적으로 등록되었습니다.', newReview: response });
  } catch (error) {
    if (error instanceof ReviewError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({
        message: '리뷰 등록 중 예기치 못한 사유로 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        error,
      });
    }
  }
};

// ISBN으로 리뷰 불러오기 - Read
export const getReviewsByIsbn = async (
  req: Request<ReviewParams, {}, {}>,
  res: Response,
): Promise<void> => {
  const { isbn13 } = req.params;

  if (!isbn13) {
    res.status(400).json({ message: '필수 값인 ISBN 번호가 누락되었습니다.' });
    return;
  }

  try {
    const response = await getReviewsByIsbnService(req.params);
    if (!response) {
      res.status(404).json({ message: '해당 도서의 리뷰를 찾을 수 없습니다.' });
      return;
    }
    res.status(200).json({
      message: '리뷰 조회에 성공했습니다.',
      data: {
        reviews: response,
      },
    });
  } catch (error) {
    if (error instanceof ReviewError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: '리뷰를 불러오는 중 오류가 발생했습니다.', error });
    }
  }
};

//TODO: 리뷰 수정, 삭제 기능 구현 필요(회원 도메인 구현 이후)
