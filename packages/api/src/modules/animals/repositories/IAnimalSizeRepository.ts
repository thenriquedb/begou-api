import { ICreateAnimalSizeDTO } from "@modules/animals/dtos/ICreateAnimalSizeDTO";
import { AnimalSize } from "@modules/animals/entities/AnimalSize";

export interface IAnimalSizesRepository {
  create: (data: ICreateAnimalSizeDTO) => Promise<void>;
  findByName: (name: string) => Promise<AnimalSize>;
  list: () => Promise<AnimalSize[]>;
}
