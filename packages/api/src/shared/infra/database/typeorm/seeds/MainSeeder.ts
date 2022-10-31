import { DataSource } from "typeorm";
import {
  runSeeder,
  Seeder,
  SeederConstructor,
  SeederFactoryManager,
} from "typeorm-extension";

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
import { AdoptionStatusSeeder } from "./AdoptionStatusSeeder";

export class MainSeeder implements Seeder {
  private dataSource: DataSource;

  private setDataSource(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  private async runSeeder(seeder: SeederConstructor) {
    return runSeeder(this.dataSource, seeder);
  }

  private async runUserSeeders() {
    await this.runSeeder(AssociateRoleSeeder);
    await this.runSeeder(UserRoleSeeder);
  }

  private async runInstitutionSeeders() {
    await this.runSeeder(InstitutionSeeder);
    await this.runSeeder(InstitutionAssociateSeeder);
    await this.runSeeder(InstitutionAddressSeeder);
  }

  private async runAnimalSeeders() {
    await this.runSeeder(AnimalHealthSeeder);
    await this.runSeeder(AnimalPersonalitySeeder);
    await this.runSeeder(AnimalSizeSeeder);
    await this.runSeeder(SpecieSeeder);
    await this.runSeeder(StageOfLifeSeeder);
  }

  private async runAdoptionSeeders() {
    await this.runSeeder(AdoptionStatusSeeder);
  }

  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    this.setDataSource(dataSource);
    await this.runUserSeeders();
    await this.runAnimalSeeders();
    await this.runInstitutionSeeders();
    await this.runAdoptionSeeders();
  }
}
