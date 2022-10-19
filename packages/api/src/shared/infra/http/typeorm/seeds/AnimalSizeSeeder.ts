import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { AnimalSize } from "@modules/animals/entities/AnimalSize";

enum AnimalSizeValue {
  MINI = "mini",
  SMALL = "pequeno",
  MEDIUM = "medío",
  LARGE = "grande",
  GIANT = "gigante",
}

export class AnimalSizeSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(AnimalSize);

    const mini = repository.create({
      name: AnimalSizeValue.MINI,
      description: "0,5kg a 6kg",
    });

    const small = repository.create({
      name: AnimalSizeValue.SMALL,
      description: "6kg a 15kg",
    });

    const medium = repository.create({
      name: AnimalSizeValue.MEDIUM,
      description: "15kg a 25kg",
    });

    const large = repository.create({
      name: AnimalSizeValue.LARGE,
      description: "25kg a 45kg",
    });

    const giant = repository.create({
      name: AnimalSizeValue.GIANT,
      description: "45kg a 90kg",
    });

    await repository.save(mini);
    await repository.save(small);
    await repository.save(medium);
    await repository.save(large);
    await repository.save(giant);
  }
}
