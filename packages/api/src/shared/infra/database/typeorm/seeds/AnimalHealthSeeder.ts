import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { AnimalHealth } from "@modules/animals/infra/typeorm/entities/AnimalHealth";

enum AnimalHealthValue {
  VACCINATED = "vacinado",
  WORMED = "vermifugado",
  CASTRATED = "castrado",
}

export class AnimalHealthSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(AnimalHealth);

    const castrated = repository.create({
      name: AnimalHealthValue.CASTRATED,
      description: "Animal castrado",
    });

    const vaccinated = repository.create({
      name: AnimalHealthValue.VACCINATED,
      description: "Todas as vacinas essenciais aplicadas",
    });

    const wormed = repository.create({
      name: AnimalHealthValue.WORMED,
      description: "Animal vermifugado",
    });

    await repository.save(castrated);
    await repository.save(vaccinated);
    await repository.save(wormed);
  }
}
