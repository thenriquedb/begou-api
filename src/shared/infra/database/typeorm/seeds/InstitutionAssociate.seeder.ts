import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { AssociateRole } from "@modules/institutions/enums/AssociateRole";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Institution } from "@modules/institutions/infra/typeorm/entities/Institution";
import { Role } from "@modules/accounts/infra/typeorm/entities/Role";
import { InstitutionAssociate } from "@modules/institutions/infra/typeorm/entities/InstitutionAssociate";

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
      email: "founder@email.com",
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
