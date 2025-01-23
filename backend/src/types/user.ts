export interface User {
  nickName: string;
  email: string;
  password: string;
  birthDate?: Date;
  gender?: "male" | "female" | "other";
}

// 회원가입 유저 타입
export interface SignUpUser extends User {
  confirmPassword: string;
}
