import type {
  SignInUserServiceBody,
  SignInUserServiceResponse,
  SignUpUserServiceBody,
  SignUpUserServiceResponse,
} from '@/types/user';
import jwt from 'jsonwebtoken';
import UserModel from '@/models/user.model';
import { ConfigurationError } from '@/errors/ConfigurationError';
import { AuthenticationError } from '@/errors/AuthenticationError';

const jwtSecretKey = process.env.JWT_SECRET_KEY;

if (!jwtSecretKey) {
  throw new ConfigurationError(500, 'JWT_SECRET_KEY 환경 변수가 설정되지 않았습니다.');
}

export const signUpUserService = async ({
  accountId,
  password,
  email,
  birthDate,
  gender,
}: SignUpUserServiceBody): Promise<SignUpUserServiceResponse> => {
  const hashedPassword = await new UserModel().hashPassword(password);

  const newUser = new UserModel({
    accountId,
    email,
    password: hashedPassword,
    birthDate,
    gender,
  });

  await newUser.save();

  const accessToken = jwt.sign(
    {
      _id: newUser._id,
      accountId: newUser.accountId,
    },
    jwtSecretKey,
    {
      expiresIn: '2h',
    },
  );

  if (!accessToken) {
    throw new AuthenticationError(401, '토큰이 생성되지 않았습니다.');
  }

  return {
    accessToken,
  };
};

export const signInUserService = async ({
  accountId,
  password,
}: SignInUserServiceBody): Promise<SignInUserServiceResponse> => {
  const user = await UserModel.findOne({ accountId });

  if (!user || !(await user.verifyPassword(password))) {
    throw new AuthenticationError(401, '계정 ID 또는 비밀번호가 일치하지 않습니다.');
  }

  const accessToken = jwt.sign(
    {
      _id: user._id,
      accountId: user.accountId,
    },
    jwtSecretKey,
    {
      expiresIn: '2h',
    },
  );

  if (!accessToken) {
    throw new AuthenticationError(401, '토큰이 생성되지 않았습니다.');
  }

  return {
    accessToken,
  };
};
