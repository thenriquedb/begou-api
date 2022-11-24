import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { User } from "@modules/accounts/entities/User";
import { BCryptAdapter } from "@shared/infra/cryptography/BcryptAdapter";

export class UserRoleSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const repository = dataSource.getRepository(User);
    const bCryptAdapter = new BCryptAdapter();

    const user = repository.create({
      email: "admin@email.com",
      password: await bCryptAdapter.encode("admin", 8),
      name: "admin",
      phone_number: "9999999999",
    });

    await repository.save(user);
  }
}
