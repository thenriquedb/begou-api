import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class RemoveRoleIdColumnFromUserTable1666114140425 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("user", "FK_UserRole");
    await queryRunner.dropColumn("user", "role_id");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "user",
      new TableColumn({
        name: "role_id",
        type: "varchar",
        length: "36",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        name: "FK_UserRole",
        referencedTableName: "role",
        referencedColumnNames: ["id"],
        columnNames: ["role_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }
}
