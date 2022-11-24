import { User } from "@modules/accounts/entities/User";

declare global {
  namespace Express {
    export interface Request {
      user: Pick<User, "email" | "id">;
    }
  }
}
