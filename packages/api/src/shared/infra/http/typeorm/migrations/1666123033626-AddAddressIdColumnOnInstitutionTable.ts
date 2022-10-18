import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddAddressIdColumnOnInstitutionTable1666123033626
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "institution",
      new TableColumn({
        name: "address_id",
        type: "varchar",
        length: "36",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "institution",
      new TableForeignKey({
        name: "FK_Address",
        referencedTableName: "address",
        referencedColumnNames: ["id"],
        columnNames: ["address_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("institution", "FK_Address");
    await queryRunner.dropColumn("institution", "address_id");
  }
}
