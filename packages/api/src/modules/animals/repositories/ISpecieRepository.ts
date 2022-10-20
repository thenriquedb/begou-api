import { Specie } from "@modules/animals/entities/Specie";

export interface ISpecieRepository {
  findById: (id: string) => Promise<Specie>;
  list: () => Promise<Specie[]>;
}
