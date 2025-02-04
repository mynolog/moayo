import type {
  CreateReviewBody,
  DeleteReviewBody,
  ReviewParams,
  UpdateReviewBody,
} from '@/types/review';
import { ReviewError } from '@/errors/ReviewError';
import ReviewModel from '@/models/review.model';

export const createReviewService = async (params: ReviewParams, body: CreateReviewBody) => {
  const { isbn13 } = params;
  const { content, rating, user_id, accountId } = body;

  if (rating < 1 || rating > 5) {
    throw new ReviewError(400, '평점은 1점에서 5점 사이여야 합니다.');
  }

  const newReview = new ReviewModel({
    isbn13,
    content,
    rating,
    user_id,
    accountId,
  });

  return await newReview.save();
};

export const updateReviewService = async (body: UpdateReviewBody) => {
  const { rating, content, _id } = body;

  const existedReview = await ReviewModel.findById(_id);

  if (!existedReview) {
    throw new ReviewError(404, '리뷰가 존재하지 않습니다.');
  }

  if (rating || content) {
    existedReview.content = content ?? existedReview.content;
    existedReview.rating = rating ?? existedReview.rating;
  }

  const updatedReview = await existedReview.save();
  return updatedReview;
};

export const deleteReviewService = async (body: DeleteReviewBody) => {
  const { _id } = body;

  const deletedReview = await ReviewModel.findByIdAndDelete(_id);
  if (!deletedReview) {
    throw new ReviewError(404, '리뷰가 존재하지 않습니다.');
  }
  return deletedReview;
};

export const getReviewsByIsbnService = async (params: ReviewParams) => {
  const { isbn13 } = params;

  const reviews = await ReviewModel.find({ isbn13 }).sort({ createdAt: -1 });

  // 해당 도서의 리뷰가 없을 경우에는 빈배열로 반환
  if (reviews.length === 0 || !reviews) {
    return [];
  }

  return reviews;
};
