import { UserError } from '@/errors/UserError';
import UserModel from '@/models/user.model';

export const getUserProfileService = async (_id: string) => {
  const user = await UserModel.findById(_id);

  if (!user) {
    throw new UserError(404, '유저 정보를 찾을 수 없습니다.');
  }

  const userProfile = {
    email: user?.email,
    birthDate: user?.birthDate,
    gender: user?.gender,
  };

  return userProfile;
};
