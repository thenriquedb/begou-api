import { ICreateAnimalDTO } from "@modules/animals/dtos/ICreateAnimalDTO";
import { Animal } from "@modules/animals/entities/Animal";

export interface IAnimalRepository {
  create: (data: ICreateAnimalDTO) => Promise<void>;
  findById: (id: string) => Promise<Animal>;
  listByIdInstitutionId: (institutionId: string) => Promise<Animal[]>;
}
