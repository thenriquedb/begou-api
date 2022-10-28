import { StageOfLife } from "@modules/animals/infra/typeorm/entities/StageOfLife";

export interface IStageOfLifeRepository {
  findById: (id: string) => Promise<StageOfLife>;
}
