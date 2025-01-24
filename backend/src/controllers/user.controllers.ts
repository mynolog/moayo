import type { SignUpUser, SignInUser } from '@/types/user';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '@/models/user.model';

// 회원 가입 - Create
export const signUpUser = async (
  req: Request<{}, {}, SignUpUser>,
  res: Response,
): Promise<void> => {
  const { nickName, email, password, confirmPassword, birthDate, gender } = req.body;
  const existedEmail = await UserModel.findOne({ email });
  // DB에 이메일 존재 여부 확인
  if (existedEmail) {
    res.status(400).json({ message: '이미 등록된 이메일입니다.' });
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
    // 회원 가입
    const hashedPassword = await new UserModel().hashPassword(password);
    const newUser = new UserModel({
      nickName,
      email,
      password: hashedPassword,
      birthDate,
      gender,
    });
    await newUser.save();
    // JWT 생성
    const accessToken = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '2h',
      },
    );
    // 클라이언트 쿠키 설정
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 7200000,
      sameSite: 'lax',
    });

    res.status(201).json({ message: '회원가입이 정상적으로 완료되었습니다.' });
  } catch (error) {
    console.error(`회원가입 처리 중 오류가 발생했습니다: ${error}`);
    res.status(500).json({
      message: '회원가입 처리 중 예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    });
  }
};

// 로그인 - Read
export const signInUser = async (
  req: Request<{}, {}, SignInUser>,
  res: Response,
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: '이메일과 비밀번호는 필수입니다.' });
    return;
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({ message: '등록된 계정이 아닙니다.' });
      return;
    }
    const isPasswordValid = await user.verifyPassword(password);

    if (!isPasswordValid) {
      res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
      return;
    }

    // JWT 생성
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '2h',
      },
    );
    // 클라이언트 쿠키 설정
    res.cookie('accessToken', accessToken, {
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
