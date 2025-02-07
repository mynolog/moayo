import type { Response } from 'express';
import type { AuthRequest } from '@/types/express';

import { getUserProfileService } from '@/services/user.services';
import { UserError } from '@/errors/UserError';
import { GetUserProfileResponse, GetUserProfileResponseData } from '@/types/user';
import { ErrorResponse } from '@/types/error';

export const getUserProfile = async (
  req: AuthRequest,
  res: Response<GetUserProfileResponse | ErrorResponse>,
) => {
  if (!req.user) {
    res.status(403).json({ message: '인증되지 않은 사용자입니다.' });
    return;
  }
  const { _id } = req.user;

  if (!_id) {
    res.status(403).json({ message: '인증되지 않은 사용자입니다.' });
    return;
  }

  try {
    const userProfile: GetUserProfileResponseData = await getUserProfileService(_id);

    res.status(200).json({ message: '유저 정보 불러오기 완료했습니다.', userProfile });
  } catch (error) {
    console.error(`유저 정보를 불러오는 중 오류가 발생했습니다: ${error}`);
    if (error instanceof UserError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: '유저 정보를 불러오는 중 서버 오류가 발생했습니다.' });
    }
  }
};
