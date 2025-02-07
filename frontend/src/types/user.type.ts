export interface UserProfile {
  accountId: string;
  email?: string;
  birthDate?: Date;
  gender?: 'male' | 'female' | 'other';
}

export interface UserProfileResponse {
  userProfile: UserProfile;
  message: string;
}
