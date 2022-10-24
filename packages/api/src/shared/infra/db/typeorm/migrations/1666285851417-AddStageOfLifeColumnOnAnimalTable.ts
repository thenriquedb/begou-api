import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddStageOfLifeColumnOnAnimalTable1666285851417
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "animal",
      new TableColumn({
        name: "stage_of_life_id",
        type: "varchar",
        length: "36",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "animal",
      new TableForeignKey({
        name: "FK_StageOfLifeID",
        referencedTableName: "stage_of_life",
        columnNames: ["stage_of_life_id"],
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("animal", "FK_StageOfLifeID");
    await queryRunner.dropColumn("animal", "stage_of_life_id");
  }
}
