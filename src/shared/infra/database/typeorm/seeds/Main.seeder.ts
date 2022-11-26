import { DataSource } from "typeorm";
import {
  runSeeder,
  Seeder,
  SeederConstructor,
  SeederFactoryManager,
} from "typeorm-extension";

import { AnimalHealthSeeder } from "./AnimalHealth.seeder";
import { AnimalPersonalitySeeder } from "./AnimalPersonality.seeder";
import { AnimalSizeSeeder } from "./AnimalSize.seeder";
import { AssociateRoleSeeder } from "./AssociateRole.seeder";
import { InstitutionAddressSeeder } from "./InstitutionAddress.seeder";
import { InstitutionAssociateSeeder } from "./InstitutionAssociate.seeder";
import { InstitutionSeeder } from "./Institution.seeder";
import { SpecieSeeder } from "./Specie.seeder";
import { StageOfLifeSeeder } from "./StageOfLife.seeder";
import { UserRoleSeeder } from "./User.seeder";
import { AdoptionStatusSeeder } from "./AdoptionStatus.seeder";
import { AnimalSeeder } from "./Animal.seeder";

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

  private async runAnimalSeeder() {
    await this.runSeeder(AnimalSeeder);
  }

  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    this.setDataSource(dataSource);
    await this.runUserSeeders();
    await this.runAnimalSeeders();
    await this.runInstitutionSeeders();
    await this.runAdoptionSeeders();
    await this.runAnimalSeeder();
  }
}
