import { ICreateAnimalSizeDTO } from "@modules/animals/dtos/ICreateAnimalSizeDTO";
import { AnimalSize } from "@modules/animals/infra/typeorm/entities/AnimalSize";

export interface IAnimalSizesRepository {
  create: (data: ICreateAnimalSizeDTO) => Promise<void>;
  findByName: (name: string) => Promise<AnimalSize>;
  findById: (id: string) => Promise<AnimalSize>;
  list: () => Promise<AnimalSize[]>;
}
