import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUfTable1665864614747 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "uf",
        columns: [
          {
            name: "initials",
            type: "varchar",
            length: "2",
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
    await queryRunner.dropTable("uf");
  }
}
