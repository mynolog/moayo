export interface User {
  accountId: string;
  password: string;
  email?: string;
  birthDate?: Date;
  gender?: 'male' | 'female' | 'other';
}

export interface AuthUser {
  accountId: string;
  _id: string;
}

export interface UserProfile extends Omit<User, 'password'> {}

// 회원가입 유저 타입
export interface SignUpUserBody extends User {
  confirmPassword: string;
}
export interface SignUpUserServiceBody extends User {}
export interface SignUpUserResponse {
  message: string;
  user: AuthUser;
}
export interface SignUpUserServiceResponse {
  accessToken: string;
  user: AuthUser;
}
// 로그인 유저 타입
export interface SignInUserBody extends Pick<User, 'accountId' | 'password'> {}
export interface SignInUserServiceBody extends Pick<User, 'accountId' | 'password'> {}
export interface SignInUserResponse {
  message: string;
  user: AuthUser;
}
export interface SignInUserServiceResponse {
  accessToken: string;
  user: AuthUser;
}

export interface GetUserProfileResponse {
  message: string;
  userProfile: UserProfile;
}

export interface GetUserProfileResponseData extends UserProfile {}
