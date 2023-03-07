import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";
import { plainToInstance } from "class-transformer";

import { BaseDTO } from "@shared/core/dto/BaseDTO";

export class AuthenticateUserRequestDTO extends BaseDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  public create(data: Partial<this>) {
    return plainToInstance(AuthenticateUserRequestDTO, data);
  }
}
