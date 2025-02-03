/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request } from 'express';
import { JwtPayload } from './jwt';

type AuthRequestAny = any;

// AuthRequest의 구체적인 타이핑 필요..!
export interface AuthRequest<
  Params = Record<string, AuthRequestAny>,
  ResBody = AuthRequestAny,
  ReqBody = AuthRequestAny,
  Query = Record<string, AuthRequestAny>,
> extends Request<Params, ResBody, ReqBody, Query> {
  user?: JwtPayload;
}
