import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { User } from "@modules/accounts/entities/User";
import { Institution } from "@modules/institutions/entities/Institution";
import { Role } from "@modules/accounts/entities/Role";
import { AssociateRole } from "@modules/institutions/enums/AssociateRole";
import { InstitutionAssociate } from "@modules/institutions/entities/InstitutionAssociate";

export class InstitutionAssociateSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const userRepository = dataSource.getRepository(User);
    const institutionRepository = dataSource.getRepository(Institution);
    const roleRepository = dataSource.getRepository(Role);
    const associateRepository = dataSource.getRepository(InstitutionAssociate);

    const institution = await institutionRepository.findOneBy({
      name: "Ong de Teste",
    });

    const user = await userRepository.findOneBy({
      email: "admin@email.com",
    });

    const role = await roleRepository.findOneBy({
      name: AssociateRole.FOUNDER,
    });

    const associate = associateRepository.create({
      institution,
      role,
      user,
    });

    await associateRepository.save(associate);
  }
}
