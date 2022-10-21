import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { AdoptionStatus } from "@modules/adoption/entities/AdoptionStatus";

enum AdoptionStatusValue {
  PENDING = "pendente",
  REVIEW = "análise",
  ACCEPTED = "aceita",
}

export class AdoptionStatusSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(AdoptionStatus);

    const accepted = repository.create({
      name: AdoptionStatusValue.ACCEPTED,
      description: "",
    });

    const pending = repository.create({
      name: AdoptionStatusValue.PENDING,
      description: "",
    });

    const review = repository.create({
      name: AdoptionStatusValue.REVIEW,
      description: "",
    });

    await repository.save(pending);
    await repository.save(review);
    await repository.save(accepted);
  }
}
