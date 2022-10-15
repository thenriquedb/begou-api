import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCityTable1665864486422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "city",
        columns: [
          {
            name: "zip_code",
            type: "varchar",
            length: "8",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("city");
  }
}
