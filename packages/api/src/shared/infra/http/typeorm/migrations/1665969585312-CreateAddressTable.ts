import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAddressTable1665969585312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "address",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "36",
            isPrimary: true,
          },
          {
            name: "street",
            type: "varchar",
          },
          {
            name: "neighborhood",
            type: "varchar",
          },
          {
            name: "complement",
            type: "varchar",
          },
          {
            name: "zip_code",
            type: "varchar",
            length: "8",
            isNullable: true,
          },
          {
            name: "uf_initials",
            type: "varchar",
            length: "2",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP()",
          },
        ],
        foreignKeys: [
          {
            name: "FK_AddressCity",
            referencedTableName: "city",
            referencedColumnNames: ["zip_code"],
            columnNames: ["zip_code"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
          {
            name: "FK_AddressUf",
            referencedTableName: "uf",
            referencedColumnNames: ["initials"],
            columnNames: ["uf_initials"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("address");
  }
}
