export class ReviewError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'ReviewError';
    this.statusCode = statusCode;
  }
}
