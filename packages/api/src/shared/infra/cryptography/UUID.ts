import { v4 as uuidV4 } from "uuid";

export class UUID {
  static generate() {
    return uuidV4();
  }
}
