import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInstitutionUserTable1666121662812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "institution_user",
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
            name: "role_id",
            type: "varchar",
            length: "36",
          },
        ],
        foreignKeys: [
          {
            name: "FK_InstitutionID",
            referencedTableName: "institution",
            referencedColumnNames: ["id"],
            columnNames: ["institution_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_UserID",
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FK_RoleID",
            referencedTableName: "role",
            referencedColumnNames: ["id"],
            columnNames: ["role_id"],
            onDelete: "RESTRICT",
            onUpdate: "RESTRICT",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("institution_user");
  }
}
