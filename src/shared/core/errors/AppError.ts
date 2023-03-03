/**
 * @see https://stackoverflow.com/a/68899842/9525489
 */
export class AppError extends Error {
  public readonly message: string;
  public readonly data: any;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400, data = {}) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
