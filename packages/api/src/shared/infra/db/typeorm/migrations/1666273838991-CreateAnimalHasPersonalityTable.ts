import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAnimalHasPersonalityTable1666273838991
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
            name: "FK_AnimalPersonality_Animal_ID",
            referencedTableName: "animal",
            referencedColumnNames: ["id"],
            columnNames: ["animal_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("animal_has_personality");
  }
}
