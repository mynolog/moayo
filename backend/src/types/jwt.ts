export interface JwtPayload {
  _id: string;
  accountId: string;
  iat?: number;
  exp?: number;
}
