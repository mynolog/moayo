import type { JwtPayload } from '@/types/jwt';
import type { AuthRequest } from '../types/express';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ROUTES } from '@/routes/apiRoutes';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (req.url.includes(ROUTES.SIGN_IN) || req.url.includes(ROUTES.SIGN_UP)) {
    next();
    return;
  }

  if (!token) {
    res.status(401).json({ message: '토큰이 존재하지 않습니다. 다시 로그인 해주세요.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;
    //TODO: Express.req.user 타입 확장 적용 안되는 문제 해결 필요
    req.user = {
      _id: decoded._id,
      accountId: decoded.accountId,
    };

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: '토큰이 유효하지 않거나 만료되었습니다. 다시 로그인 해주세요.', error });
  }
};
