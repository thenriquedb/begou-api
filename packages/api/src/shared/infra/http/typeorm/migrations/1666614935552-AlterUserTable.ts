import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserTable1666614935552 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "user",
      "phone_number",
      new TableColumn({
        name: "phone_number",
        type: "varchar",
        isUnique: true,
        isNullable: true,
        length: "11",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "user",
      "phone_number",
      new TableColumn({
        name: "phone_number",
        type: "varchar",
        isUnique: true,
        isNullable: false,
        length: "11",
      })
    );
  }
}
