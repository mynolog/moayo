import type { ReviewBody, ReviewParams } from '@/types/review';
import { ReviewError } from '@/errors/ReviewError';
import ReviewModel from '@/models/review.model';

export const createReviewService = async (params: ReviewParams, body: ReviewBody) => {
  const { isbn13 } = params;
  const { accountId, title, content, rating } = body;

  if (rating < 1 || rating > 5) {
    throw new ReviewError(400, '평점은 1점에서 5점 사이여야 합니다.');
  }

  const newReview = new ReviewModel({
    isbn13,
    accountId,
    title,
    content,
    rating,
  });

  return await newReview.save();
};

export const getReviewsByIsbnService = async (params: ReviewParams) => {
  const { isbn13 } = params;

  const reviews = await ReviewModel.find({ isbn13 });

  // 해당 도서의 리뷰가 없을 경우에는 빈배열로 반환
  if (reviews.length === 0 || !reviews) {
    return [];
  }

  return reviews;
};
