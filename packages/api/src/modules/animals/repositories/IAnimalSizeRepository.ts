import { AnimalSize } from "@modules/animals/entities/AnimalSize";

export interface ICreateAnimalSizeDTO {
  name: string;
  description: string;
}

export interface IAnimalSizesRepository {
  create: (data: ICreateAnimalSizeDTO) => Promise<void>;
  findByName: (name: string) => Promise<AnimalSize>;
  list: () => Promise<AnimalSize[]>;
}
