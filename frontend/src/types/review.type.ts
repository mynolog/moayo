export interface BookReview {
  _id: string;
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
