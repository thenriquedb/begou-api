import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { User } from "@modules/accounts/entities/User";
import { BCryptAdapter } from "@shared/infra/cryptography/BcryptAdapter";

export class UserRoleSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(User);
    const bCryptAdapter = new BCryptAdapter();

    const founder = repository.create({
      email: "founder@email.com",
      password: await bCryptAdapter.encode("123456", 8),
      name: "founder",
      phone_number: "9999999999",
    });

    const user = repository.create({
      email: "user@email.com",
      password: await bCryptAdapter.encode("123456", 8),
      name: "admin",
      phone_number: "9999999999",
    });

    await repository.save(founder);
    await repository.save(user);
  }
}
