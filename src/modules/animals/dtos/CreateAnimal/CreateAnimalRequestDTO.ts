import { Type, Expose, plainToInstance } from "class-transformer";
import { IsNotEmpty, ArrayUnique, IsOptional, IsEnum } from "class-validator";

import { AnimalGenre } from "@modules/animals/enums/Genre";
import { BaseDTO } from "@shared/core/dto/BaseDTO";

@Expose()
export class CreateAnimalRequestDTO extends BaseDTO {
  @IsNotEmpty()
  institution_id: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsEnum(AnimalGenre)
  genre: AnimalGenre;

  @IsNotEmpty()
  size_id: string;

  @IsNotEmpty()
  specie_id: string;

  @IsNotEmpty()
  stage_of_life_id: string;

  @ArrayUnique()
  @Type(() => String)
  health_ids: string[];

  @ArrayUnique()
  @Type(() => String)
  personality_ids: string[];

  public create(data: Partial<this>) {
    return plainToInstance(CreateAnimalRequestDTO, data);
  }
}
