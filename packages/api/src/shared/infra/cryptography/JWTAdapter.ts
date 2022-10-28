import jwt from "jsonwebtoken";

import { ITokenManager } from "@shared/ports/cryptography/ITokenManager";
import config from "@shared/config/cryptography";

export class JWTEAdapter implements ITokenManager {
  private secret: string;

  constructor(secret?: string) {
    this.secret = secret ?? config.secret;
  }

  encrypt(info: object, subject: string, expiresIn = "1d") {
    return jwt.sign(info, this.secret, {
      subject,
      expiresIn,
    });
  }

  decrypt(token: string): IPayload {
    const decoded = jwt.verify(token, this.secret);
    return decoded as IPayload;
  }
}
