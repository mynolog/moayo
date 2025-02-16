export interface BookReview {
  _id: string;
  user_id: string;
  isbn13: string;
  accountId: string;
  title: string;
  rating: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookReviewsResponse {
  message: string;
  data: BookReviewsResponseData;
}
export interface BookReviewsResponseData {
  reviews: BookReview[];
}

export interface SubmitReviewResponse {
  message: string;
  newReview: SubmitReviewResponseData;
}
export interface SubmitReviewResponseData {
  newReview: Omit<BookReview, 'user_id'>;
}

export interface SubmitReviewForm {
  accountId: string;
  rating: number;
  content: string;
}
