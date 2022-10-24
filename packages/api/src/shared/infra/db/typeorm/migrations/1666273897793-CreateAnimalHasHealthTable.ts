import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnimalHasHealthTable1666273897793
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "animal_has_health",
        columns: [
          {
            name: "animal_id",
            type: "varchar",
            length: "36",
          },
          {
            name: "health_id",
            type: "varchar",
            length: "36",
          },
        ],
        foreignKeys: [
          {
            name: "FK_AnimalHealth_AnimalID",
            referencedTableName: "animal",
            referencedColumnNames: ["id"],
            columnNames: ["animal_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_AnimalHealth",
            referencedTableName: "animal_health",
            referencedColumnNames: ["id"],
            columnNames: ["health_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("animal_has_health");
  }
}
