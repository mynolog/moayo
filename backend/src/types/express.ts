import type { Request } from 'express';
import type { JwtPayload } from './jwt';

export interface AuthRequest extends Request {
  user?: JwtPayload;
}
