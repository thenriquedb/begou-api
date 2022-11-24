import { Specie } from "@modules/animals/infra/typeorm/entities/Specie";

export interface ISpecieRepository {
  findById: (id: string) => Promise<Specie>;
  list: () => Promise<Specie[]>;
}
