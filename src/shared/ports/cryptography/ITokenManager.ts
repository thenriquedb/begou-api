export interface IPayload {
  sub: string;
}

export interface ITokenManager {
  encrypt(info: object, subject: string, expiresIn?: string): string;
  decrypt(token: string): IPayload;
}
