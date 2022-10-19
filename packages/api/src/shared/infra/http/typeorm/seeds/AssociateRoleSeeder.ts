import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Role } from "@modules/accounts/entities/Role";
import { AssociateRole } from "@modules/institutions/enums/AssociateRole";

export class AssociateRoleSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(Role);

    const voluntaryRole = repository.create({
      name: AssociateRole.VOLUNTARY,
      description: "",
    });

    const founderRole = repository.create({
      name: AssociateRole.FOUNDER,
      description: "",
    });

    await repository.save(voluntaryRole);
    await repository.save(founderRole);
  }
}
