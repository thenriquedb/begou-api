import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameAddressTable1666132442511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("address", "institution_address");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("institution_address", "address");
  }
}
