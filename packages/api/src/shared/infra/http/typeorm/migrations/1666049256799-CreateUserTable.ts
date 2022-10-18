import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1666049256799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
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
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "phone_number",
            type: "varchar",
            isUnique: true,
            length: "11",
          },
          {
            name: "role_id",
            type: "varchar",
            length: "36",
            isNullable: true,
          },
          {
            name: "password",
            type: "varchar",
          },

          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_UserRole",
            referencedTableName: "role",
            referencedColumnNames: ["id"],
            columnNames: ["role_id"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
