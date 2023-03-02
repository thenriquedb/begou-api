import jwt from "jsonwebtoken";

import config from "@shared/config/cryptography";
import { IPayload, ITokenManager } from "@data/protocols/cryptography/ITokenManager";

export class JWTAdapter implements ITokenManager {
  private readonly secret: string = config.secret;

  encrypt(subject: string, expiresIn = "1d"): string {
    return jwt.sign({ subject, expiresIn }, this.secret);
  }

  decrypt(token: string): IPayload {
    const decoded = jwt.verify(token, this.secret);
    return decoded as IPayload;
  }
}
