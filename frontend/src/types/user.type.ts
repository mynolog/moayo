export interface UserProfile {
  email?: string;
  birthDate?: Date;
  gender?: 'male' | 'female' | 'other';
}

export interface UserProfileResponse {
  userProfile: UserProfile;
  message: string;
}
