export class AladinFetchError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'AladinFetchError';
    this.statusCode = statusCode;
  }
}

export class AladinSearchError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'AladinSearchError';
    this.statusCode = statusCode;
  }
}
