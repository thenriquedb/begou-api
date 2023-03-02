import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { AdoptionStatus } from "@modules/adoptions/infra/typeorm/entities/AdoptionStatus";
import { Animal } from "@modules/animals/infra/typeorm/entities/Animal";
import { Institution } from "@modules/institutions/infra/typeorm/entities/Institution";

export interface ICreateAdoptionDTO {
  user: User;
  institution: Institution;
  animal: Animal;
  status: AdoptionStatus;
}
