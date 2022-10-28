import { compare, hash } from "bcryptjs";

import { IEncoder } from "@shared/ports/cryptography/IEncoder";

export class BCryptAdapter implements IEncoder {
  async encode(plain: string, salt: string | number) {
    return hash(plain, salt);
  }

  async compare(plain: string, hashed: string) {
    return compare(plain, hashed);
  }
}
