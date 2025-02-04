export interface Review {
  _id?: string;
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

export interface UpdateReviewBody {
  _id: string;
  content?: string;
  rating?: number;
}

export interface DeleteReviewBody {
  _id: string;
}
