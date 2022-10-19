import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";

import { AssociateRoleSeeder } from "./AssociateRoleSeeder";
import { UserRoleSeeder } from "./UserSeeder";
import { InstitutionSeeder } from "./InstitutionSeeder";
import { InstitutionAssociateSeeder } from "./InstitutionAssociateSeeder";
import { AnimalHealthSeeder } from "./AnimalHealthSeeder";
import { AnimalPersonalitySeeder } from "./AnimalPersonalitySeeder";
import { AnimalSizeSeeder } from "./AnimalSizeSeeder";

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    await runSeeder(dataSource, AssociateRoleSeeder);
    await runSeeder(dataSource, UserRoleSeeder);
    await runSeeder(dataSource, InstitutionSeeder);
    await runSeeder(dataSource, InstitutionAssociateSeeder);
    await runSeeder(dataSource, AnimalHealthSeeder);
    await runSeeder(dataSource, AnimalPersonalitySeeder);
    await runSeeder(dataSource, AnimalSizeSeeder);
  }
}
