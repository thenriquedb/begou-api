import jwt from "jsonwebtoken";

import { IPayload, ITokenManager } from "@shared/ports/cryptography/ITokenManager";
import config from "@shared/config/cryptography";

export class JWTAdapter implements ITokenManager {
  private secret: string = config.secret;

  encrypt(info: object, subject: string, expiresIn = "1d"): string {
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
