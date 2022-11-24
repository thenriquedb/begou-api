import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/database/typeorm/data-source";
import { IStageOfLifeRepository } from "@modules/animals/repositories/IStageOfLifeRepository";
import { StageOfLife } from "@modules/animals/infra/typeorm/entities/StageOfLife";

export class StageOfLifeRepository implements IStageOfLifeRepository {
  private repository: Repository<StageOfLife>;

  constructor() {
    this.repository = AppDataSource.getRepository(StageOfLife);
  }

  async findById(id: string) {
    const stageOfLife = await this.repository.findOneBy({ id });
    return stageOfLife;
  }
}
