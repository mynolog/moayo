export interface Review {
  isbn13: string;
  userId: string;
  title: string;
  rating: number;
  content?: string;
}

export interface ReviewBody extends Review {}

export interface ReviewParams {
  isbn13: string;
}
