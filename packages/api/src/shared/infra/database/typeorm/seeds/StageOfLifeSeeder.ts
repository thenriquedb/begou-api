import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { StageOfLife } from "@modules/animals/infra/typeorm/entities/StageOfLife";

enum StageOfLifeValue {
  PUPPY = "filhote",
  YOUTH = "jovem",
  ADULT = "adulto",
  SENIOR = "idoso",
}

export class StageOfLifeSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(StageOfLife);

    const puppy = repository.create({
      name: StageOfLifeValue.PUPPY,
      description: "Até 1 ano de idade",
    });

    const youth = repository.create({
      name: StageOfLifeValue.YOUTH,
      description: "Até 1 a 3 anos de idade",
    });

    const adult = repository.create({
      name: StageOfLifeValue.ADULT,
      description: "3 a 8 anos de idade",
    });

    const senior = repository.create({
      name: StageOfLifeValue.SENIOR,
      description: "A partir de 8 anos",
    });

    await repository.save(puppy);
    await repository.save(youth);
    await repository.save(adult);
    await repository.save(senior);
  }
}
