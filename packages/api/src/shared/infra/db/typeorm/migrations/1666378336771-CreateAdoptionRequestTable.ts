import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAdoptionRequestTable1666378336771
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "adoption_request",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "36",
            isPrimary: true,
          },
          {
            name: "institution_id",
            type: "varchar",
            length: "36",
          },
          {
            name: "user_id",
            type: "varchar",
            length: "36",
          },
          {
            name: "animal_id",
            type: "varchar",
            length: "36",
          },
          {
            name: "status_id",
            type: "varchar",
            length: "36",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_AdoptionInstitutionID",
            referencedTableName: "institution",
            referencedColumnNames: ["id"],
            columnNames: ["institution_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_AdoptionUserID",
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_AdoptionAnimalID",
            referencedTableName: "animal",
            referencedColumnNames: ["id"],
            columnNames: ["animal_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_AdoptionStatusID",
            referencedTableName: "adoption_status",
            referencedColumnNames: ["id"],
            columnNames: ["status_id"],
            onDelete: "RESTRICT",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("adoption_request");
  }
}
