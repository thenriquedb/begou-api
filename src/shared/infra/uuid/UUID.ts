import { v4 as uuidV4 } from "uuid";

import { IStaticUUID } from "@data/protocols/uuid/IUuid";

// @ts-ignore
export class UUID implements IStaticUUID {
  static generate() {
    return uuidV4();
  }
}
