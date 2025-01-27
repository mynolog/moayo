import type { Request, Response } from 'express';
import type {
  SignUpUserBody,
  SignUpUserResponse,
  SignInUserBody,
  SignInUserResponse,
} from '@/types/user';
import type { ErrorResponse } from '@/types/error';
import UserModel from '@/models/user.model';
import { signInUserService, signUpUserService } from '@/services/user.services';
import { ConfigurationError } from '@/errors/ConfigurationError';
import { AuthenticationError } from '@/errors/AuthenticationError';

// 회원 가입 - Create
export const signUpUser = async (
  req: Request<{}, {}, SignUpUserBody>,
  res: Response<SignUpUserResponse | ErrorResponse>,
): Promise<void> => {
  const { accountId, password, confirmPassword, ...rest } = req.body;
  const existedAccountId = await UserModel.findOne({ accountId });
  // DB에 이메일 존재 여부 확인
  if (existedAccountId) {
    res.status(400).json({ message: '이미 등록된 계정 ID 입니다.' });
    return;
  }
  // 필수 값 포함 여부 확인
  if (!accountId || !password || !confirmPassword) {
    res.status(400).json({ message: '회원 가입에 필요한 필수 값이 누락되었습니다.' });
  }
  // 비밀번호와 비밀번호 재입력이 일치하는지 확인
  if (password !== confirmPassword) {
    res.status(400).json({
      message: '비밀번호가 일치하지 않습니다.',
    });
    return;
  }

  try {
    const response = await signUpUserService({ accountId, password, ...rest });

    // 클라이언트 쿠키 설정
    res.cookie('accessToken', response.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7200000,
      sameSite: 'lax',
    });

    res.status(201).json({ message: '회원가입이 정상적으로 완료되었습니다.' });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof ConfigurationError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({
        message: '회원가입 처리 중 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  }
};

// 로그인 - Read
export const signInUser = async (
  req: Request<{}, {}, SignInUserBody>,
  res: Response<SignInUserResponse>,
): Promise<void> => {
  const { accountId, password } = req.body;

  if (!accountId || !password) {
    res.status(400).json({ message: '이메일과 비밀번호는 필수입니다.' });
    return;
  }

  try {
    const response = await signInUserService({ accountId, password });

    // 클라이언트 쿠키 설정
    res.cookie('accessToken', response.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7200000,
      sameSite: 'lax',
    });

    res.status(200).json({ message: '로그인 성공했습니다.' });
  } catch (error) {
    console.error(`로그인 처리 중 오류가 발생했습니다: ${error}`);
    res.status(500).json({ message: '로그인 처리 중 서버 오류가 발생했습니다.' });
  }
};
