import { Role } from "@modules/accounts/entities/Role";
import { User } from "@modules/accounts/entities/User";
import { Institution } from "@modules/institutions/entities/Institution";

export interface ICreateInstitutionAssociateDTO {
  institution: Institution;
  associtate: {
    user: User;
    role: Role;
  };
}
