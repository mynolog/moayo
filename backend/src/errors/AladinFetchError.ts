export class AladinFetchError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'AladinFetchError';
    this.statusCode = statusCode;
  }
}
