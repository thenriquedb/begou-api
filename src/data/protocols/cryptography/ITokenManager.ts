export interface IPayload {
  sub: string;
}

export interface ITokenManager {
  encrypt(subject: string, expiresIn?: string): string;
  decrypt(token: string): IPayload;
}
