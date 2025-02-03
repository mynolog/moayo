export interface Review {
  isbn13: string;
  accountId: string;
  user_id: string;
  rating: number;
  content: string;
}

export interface ReviewBody extends Review {}
export interface ReviewParams {
  isbn13: string;
}

export interface CreateReviewBody extends Review {}
