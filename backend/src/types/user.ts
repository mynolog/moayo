export interface User {
  accountId: string;
  password: string;
  email?: string;
  birthDate?: Date;
  gender?: 'male' | 'female' | 'other';
}

// 회원가입 유저 타입
export interface SignUpUserBody extends User {
  confirmPassword: string;
}
export interface SignUpUserServiceBody extends User {}
export interface SignUpUserResponse {
  message: string;
  user?: Pick<User, 'accountId'>;
}
export interface SignUpUserServiceResponse {
  accessToken: string;
  user: Pick<User, 'accountId'>;
}
// 로그인 유저 타입
export interface SignInUserBody extends Pick<User, 'accountId' | 'password'> {}
export interface SignInUserServiceBody extends Pick<User, 'accountId' | 'password'> {}
export interface SignInUserResponse {
  message: string;
  user?: Pick<User, 'accountId'>;
}
export interface SignInUserServiceResponse {
  accessToken: string;
  user: Pick<User, 'accountId'>;
}
