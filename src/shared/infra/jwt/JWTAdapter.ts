import jwt from "jsonwebtoken";

import config from "@shared/config/cryptography";
import { IPayload, ITokenManager } from "@data/protocols/cryptography/ITokenManager";

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
