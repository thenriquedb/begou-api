import { ICreateAnimalDTO } from "@modules/animals/dtos/ICreateAnimalDTO";
import { IFindAnimalDTO } from "@modules/animals/dtos/IFindAnimalDTO";
import { Animal } from "@modules/animals/entities/Animal";

export interface IAnimalRepository {
  create: (data: ICreateAnimalDTO) => Promise<void>;
  findById: (id: string) => Promise<Animal>;
  listByInstitutionId: (
    institutionId: string,
    data?: IFindAnimalDTO
  ) => Promise<Animal[]>;
  update: (id: string, data: Partial<Animal>) => Promise<Animal>;
}
