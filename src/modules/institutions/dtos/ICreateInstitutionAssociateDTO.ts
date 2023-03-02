import { Role } from "@modules/accounts/infra/typeorm/entities/Role";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Institution } from "@modules/institutions/infra/typeorm/entities/Institution";

export interface ICreateInstitutionAssociateDTO {
  institution: Institution;
  associtate: {
    user: User;
    role: Role;
  };
}
