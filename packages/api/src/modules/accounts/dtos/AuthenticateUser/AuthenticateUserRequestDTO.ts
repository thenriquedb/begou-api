import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

import { BaseDTO } from "@shared/core/dto/BaseDTO";
import { ClassTransformer } from "@shared/infra/util/ClassTransformer";

export class AuthenticateUserRequestDTO extends BaseDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password: string;

  public create(data: Partial<this>) {
    return ClassTransformer.create(AuthenticateUserRequestDTO, data);
  }
}
