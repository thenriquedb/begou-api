import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from "class-validator";

import { BaseDTO } from "@shared/core/dto/BaseDTO";
import { ClassTransformer } from "@shared/infra/util/ClassTransformer";

export class CreateUserRequestDto extends BaseDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password: string;

  @IsOptional()
  @IsPhoneNumber("BR")
  phone_number: string;

  public create(data: Partial<this>) {
    return ClassTransformer.plainToInstance(CreateUserRequestDto, data);
  }
}
