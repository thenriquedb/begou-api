import { StageOfLife } from "@modules/animals/entities/StageOfLife";

export interface IStageOfLifeRepository {
  findById: (id: string) => Promise<StageOfLife>;
}
