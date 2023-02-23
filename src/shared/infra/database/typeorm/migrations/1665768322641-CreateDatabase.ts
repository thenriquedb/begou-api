import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1665768322641 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createDatabase("begou", true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropDatabase("begou", true);
  }
}
