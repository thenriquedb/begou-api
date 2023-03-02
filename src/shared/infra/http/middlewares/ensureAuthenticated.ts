import { Request, Response, NextFunction } from "express";

import { UnauthorizedError } from "@shared/core/errors/UnauthorizedError";
import { JWTAdapter } from "@shared/infra/jwt/JWTAdapter";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";

const tokenManager = new JWTAdapter();
const usersRepository = new UsersRepository();

export async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("User token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = tokenManager.decrypt(token);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new UnauthorizedError("User does not exists!");
    }

    request.user = {
      id: user_id,
      email: user.email,
    };

    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
}
