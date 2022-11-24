import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { AnimalGenre } from "@modules/animals/enums/Genre";

export class CreateAnimalTable1666273764428 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "animal",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "36",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "genre",
            type: "varchar",
            length: "1",
            enum: [AnimalGenre.FEMALE, AnimalGenre.MALE],
          },
          {
            name: "specie_id",
            type: "varchar",
            length: "36",
            isNullable: true,
          },
          {
            name: "institution_id",
            type: "varchar",
            length: "36",
          },
          {
            name: "size_id",
            type: "varchar",
            length: "36",
            isNullable: true,
          },

          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            name: "FK_AnimalInstitutionID",
            referencedTableName: "institution",
            referencedColumnNames: ["id"],
            columnNames: ["institution_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_AnimalSizeID",
            referencedTableName: "animal_size",
            referencedColumnNames: ["id"],
            columnNames: ["size_id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_AnimalSpecieID",
            referencedTableName: "specie",
            referencedColumnNames: ["id"],
            columnNames: ["specie_id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("animal");
  }
}
