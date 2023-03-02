import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Institution } from "@modules/institutions/infra/typeorm/entities/Institution";

export class InstitutionSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const institutionRepository = dataSource.getRepository(Institution);
    const institution = institutionRepository.create({ name: "Ong de Teste" });
    await institutionRepository.save(institution);
  }
}
