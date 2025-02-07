export class UserError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'UserError';
    this.statusCode = statusCode;
  }
}
