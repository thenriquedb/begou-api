export interface IEncoder {
  encode(plain: string, salt: string | number): Promise<string>;
  compare(plain: string, hashed: string): Promise<boolean>;
}
