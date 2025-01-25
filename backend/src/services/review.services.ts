import type { ReviewBody, ReviewParams } from '@/types/review';
import { ReviewError } from '@/errors/ReviewError';
import ReviewModel from '@/models/review.model';

export const createReviewService = async (params: ReviewParams, body: ReviewBody) => {
  const { isbn13 } = params;
  const { userId, title, content, rating } = body;

  if (!isbn13 || !userId || !title || !rating) {
    throw new ReviewError(400, '필수 값이 누락되었습니다.');
  }

  const newReview = new ReviewModel({
    isbn13,
    userId,
    title,
    content,
    rating,
  });

  await newReview.save();
};

export const getReviewsByIsbnService = async (params: ReviewParams) => {
  const { isbn13 } = params;

  const reviews = await ReviewModel.find({ isbn13 });

  if (reviews.length === 0 || !reviews) {
    throw new ReviewError(404, '해당 도서의 리뷰를 찾을 수 없습니다.');
  }

  return reviews;
};
