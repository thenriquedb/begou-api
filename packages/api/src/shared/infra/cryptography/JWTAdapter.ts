import jwt from "jsonwebtoken";

import {
  ITokenManager,
  IPayload,
} from "@data/protocols/cryptography/ITokenManager";

export class JWTEAdapter implements ITokenManager {
  private secret: string;

  constructor(secret: string = process.env.JWT_SECRET) {
    this.secret = secret;
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
