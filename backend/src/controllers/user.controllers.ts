import type { SignUpUser } from "@/types/user";
import { Request, Response } from "express";
import UserModel from "@/models/user.model";

// 회원 가입 - Create
export const signUpUser = async (
  req: Request<{}, {}, SignUpUser>,
  res: Response
): Promise<void> => {
  const { nickName, email, password, confirmPassword, birthDate, gender } =
    req.body;
  const existedEmail = await UserModel.findOne({ email });

  if (existedEmail) {
    res.status(400).json({ message: "이미 등록된 이메일입니다." });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({
      message: "비밀번호가 일치하지 않습니다.",
    });
    return;
  }

  try {
    const hashedPassword = await new UserModel().hashPassword(password);
    const newUser = new UserModel({
      nickName,
      email,
      password: hashedPassword,
      birthDate,
      gender,
    });

    await newUser.save();

    res.status(201).json({ message: "회원가입이 정상적으로 완료되었습니다." });
  } catch (error) {
    console.error(error);
    res.status(500);
    return;
  }
};

// 로그인 - Read
export const signInUser = async (): Promise<void> => {};
