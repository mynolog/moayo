import type { BookReview } from './review.type';

export interface UserProfile {
  email?: string;
  birthDate?: Date;
  gender?: 'male' | 'female' | 'other';
}

export interface UserProfileResponse {
  userProfile: UserProfile;
  message: string;
}

export interface UserReviewsResponse {
  message: string;
  data: UserReviewsResponseData;
}
export interface UserReviewsResponseData {
  reviews: BookReview[];
}
