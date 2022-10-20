import { DataSource } from "typeorm";
import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";

import { AnimalHealthSeeder } from "./AnimalHealthSeeder";
import { AnimalPersonalitySeeder } from "./AnimalPersonalitySeeder";
import { AnimalSizeSeeder } from "./AnimalSizeSeeder";
import { AssociateRoleSeeder } from "./AssociateRoleSeeder";
import { InstitutionAddressSeeder } from "./InstitutionAddressSeeder";
import { InstitutionAssociateSeeder } from "./InstitutionAssociateSeeder";
import { InstitutionSeeder } from "./InstitutionSeeder";
import { SpecieSeeder } from "./SpecieSeeder";
import { StageOfLifeSeeder } from "./StageOfLifeSeeder";
import { UserRoleSeeder } from "./UserSeeder";

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    await runSeeder(dataSource, AssociateRoleSeeder);
    await runSeeder(dataSource, UserRoleSeeder);
    await runSeeder(dataSource, InstitutionSeeder);
    await runSeeder(dataSource, InstitutionAssociateSeeder);
    await runSeeder(dataSource, AnimalHealthSeeder);
    await runSeeder(dataSource, AnimalPersonalitySeeder);
    await runSeeder(dataSource, AnimalSizeSeeder);
    await runSeeder(dataSource, SpecieSeeder);
    await runSeeder(dataSource, StageOfLifeSeeder);
    await runSeeder(dataSource, InstitutionAddressSeeder);
  }
}
