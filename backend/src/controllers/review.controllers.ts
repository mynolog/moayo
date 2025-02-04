import type {
  CreateReviewBody,
  DeleteReviewBody,
  ReviewBody,
  ReviewParams,
  UpdateReviewBody,
} from '@/types/review';
import type { Request, Response } from 'express';
import type { AuthRequest } from '@/types/express';
import { ReviewError } from '@/errors/ReviewError';
import {
  createReviewService,
  updateReviewService,
  deleteReviewService,
  getReviewsByIsbnService,
} from '@/services/review.services';
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
// 리뷰 수정 - Update
export const updateReview = async (
  req: AuthRequest<ReviewParams, {}, UpdateReviewBody>,
  res: Response,
): Promise<void> => {
  if (!req.user) {
    res.status(403).json({ message: '인증되지 않은 사용자입니다.' });
    return;
  }
  const { isbn13 } = req.params;
  const { rating, content, _id } = req.body;

  if (!isbn13) {
    res.status(400).json({ message: 'ISBN 번호가 누락되었습니다.' });
    return;
  }

  if (!_id) {
    res.status(400).json({ message: '리뷰 ID가 누락되었습니다.' });
  }

  if (!rating && !content) {
    res.status(400).json({ message: '별점, 코멘트 중 최소 한 개의 값은 포함되어야 합니다.' });
    return;
  }

  try {
    const response = await updateReviewService(req.body);
    res.status(200).json({ message: '리뷰가 정상적으로 수정되었습니다.', updatedReview: response });
  } catch (error) {
    if (error instanceof ReviewError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({
        message: '리뷰 수정 중 예기치 못한 사유로 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
        error,
      });
    }
  }
};
// 리뷰 삭제 - Delete
export const deleteReview = async (
  req: AuthRequest<ReviewParams, {}, DeleteReviewBody>,
  res: Response,
) => {
  if (!req.user) {
    res.status(403).json({ message: '인증되지 않은 사용자입니다.' });
    return;
  }
  const { isbn13 } = req.params;
  const { _id } = req.body;

  if (!isbn13) {
    res.status(400).json({ message: 'ISBN 번호가 누락되었습니다.' });
    return;
  }
  if (!_id) {
    res.status(400).json({ message: '리뷰 ID가 누락되었습니다.' });
  }

  try {
    const response = await deleteReviewService(req.body);
    if (response) {
      res.status(204).send();
    }
  } catch (error) {
    if (error instanceof ReviewError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({
        message: '리뷰 삭제 중 예기치 못한 사유로 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
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
