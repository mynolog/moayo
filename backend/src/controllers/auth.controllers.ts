import type { Request, Response } from 'express';
import { AuthRequest } from '@/types/express';
import type {
  SignUpUserBody,
  SignUpUserResponse,
  SignInUserBody,
  SignInUserResponse,
} from '@/types/user';
import type { ErrorResponse } from '@/types/error';
import UserModel from '@/models/user.model';
import { signInUserService, signUpUserService } from '@/services/auth.services';
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
    return;
  }
  // 비밀번호와 비밀번호 재입력이 일치하는지 확인
  if (password !== confirmPassword) {
    res.status(400).json({
      message: '비밀번호가 일치하지 않습니다.',
    });
    return;
  }

  try {
    const { accessToken, user } = await signUpUserService({ accountId, password, ...rest });

    if (!user) {
      res.status(400).json({ message: '유저 정보가 누락되었습니다.' });
      return;
    }

    // 클라이언트 쿠키 설정
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7200000,
      sameSite: 'none',
    });

    res.status(201).json({ message: '회원가입이 정상적으로 완료되었습니다.', user });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof ConfigurationError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({
        message: '회원가입 처리 중 서버 오류가 발생했습니다.',
      });
    }
  }
};

// 로그인 - Read
export const signInUser = async (
  req: Request<{}, {}, SignInUserBody>,
  res: Response<SignInUserResponse | ErrorResponse>,
): Promise<void> => {
  const { accountId, password } = req.body;

  if (!accountId || !password) {
    res.status(400).json({ message: '계정 ID와 비밀번호는 필수입니다.' });
    return;
  }

  try {
    const { accessToken, user } = await signInUserService({ accountId, password });

    if (!user) {
      res.status(400).json({ message: '유저 정보가 누락되었습니다.' });
      return;
    }

    // 클라이언트 쿠키 설정
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7200000,
      sameSite: 'none',
    });

    res.status(200).json({ message: '로그인 성공했습니다.', user });
  } catch (error) {
    console.error(`로그인 처리 중 오류가 발생했습니다: ${error}`);
    res.status(500).json({ message: '로그인 처리 중 서버 오류가 발생했습니다.' });
  }
};

// 유저 검증 - Read
export const checkUserAuth = async (req: AuthRequest, res: Response) => {
  if (req.user) {
    res.status(200).json({ message: '로그인 상태입니다.' });
  } else {
    res.status(401).json({ message: '로그인되지 않았습니다. 다시 로그인 해주세요.' });
  }
};
