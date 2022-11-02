import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { AnimalPersonality } from "@modules/animals/infra/typeorm/entities/AnimalPersonality";

enum AnimalPersonalityValue {
  AGGRESSIVE = "agressivo",
  SOCIABLE = "sociável",
  PASSIVE = "passivo",
  INDEPENDENT = "independentes",
}

export class AnimalPersonalitySeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(AnimalPersonality);

    const aggressive = repository.create({
      name: AnimalPersonalityValue.AGGRESSIVE,
      description: "Animal agressivo",
    });

    const independent = repository.create({
      name: AnimalPersonalityValue.INDEPENDENT,
      description: "Animal independente",
    });

    const passive = repository.create({
      name: AnimalPersonalityValue.PASSIVE,
      description: "Animal tímido",
    });

    const sociable = repository.create({
      name: AnimalPersonalityValue.SOCIABLE,
      description: "Animal sociável",
    });

    await repository.save(aggressive);
    await repository.save(independent);
    await repository.save(passive);
    await repository.save(sociable);
  }
}
