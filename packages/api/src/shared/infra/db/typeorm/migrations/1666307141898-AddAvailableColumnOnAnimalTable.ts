import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddAvailableColumnOnAnimalTable1666307141898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "animal",
      new TableColumn({
        name: "available",
        type: "boolean",
        default: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("animal", "available");
  }
}
