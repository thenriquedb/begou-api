import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterInstitutionUserTable1666211625335
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("institution_user", "institution_associate");

    await queryRunner.addColumn(
      "institution_associate",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "now()",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameTable("institution_associate", "institution_user");
    await queryRunner.dropColumn("institution_user", "created_at");
  }
}
