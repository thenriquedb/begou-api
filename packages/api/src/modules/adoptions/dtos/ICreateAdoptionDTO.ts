import { User } from "@modules/accounts/entities/User";
import { AdoptionStatus } from "@modules/adoptions/entities/AdoptionStatus";
import { Animal } from "@modules/animals/entities/Animal";
import { Institution } from "@modules/institutions/entities/Institution";

export interface ICreateAdoptionDTO {
  user: User;
  institution: Institution;
  animal: Animal;
  status: AdoptionStatus;
}
