import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Specie } from "@modules/animals/infra/typeorm/entities/Specie";

enum SpecieValue {
  CAT = "gato",
  DOG = "cachorro",
}

export class SpecieSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(Specie);

    const cat = repository.create({ name: SpecieValue.CAT });
    const dog = repository.create({ name: SpecieValue.DOG });

    await repository.save(cat);
    await repository.save(dog);
  }
}
