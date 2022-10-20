import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnimalJunctionTables1666220342491
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "animal_has_personality",
        columns: [
          {
            name: "animal_id",
            type: "varchar",
            length: "36",
          },
          {
            name: "personality_id",
            type: "varchar",
            length: "36",
          },
        ],
        foreignKeys: [
          {
            name: "FK_AnimalPersonality",
            referencedTableName: "animal_personality",
            referencedColumnNames: ["id"],
            columnNames: ["personality_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );

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
    await queryRunner.dropTable("animal_has_personality");
    await queryRunner.dropTable("animal_has_health");
  }
}
