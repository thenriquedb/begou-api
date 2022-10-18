import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UnauthorizedError } from "@shared/errors/UnauthorizedError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
  sub: string;
}

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
    const { sub: user_id } = verify(token, process.env.JWT_SECRET) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new UnauthorizedError("User does not exists!");
    }

    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
}
