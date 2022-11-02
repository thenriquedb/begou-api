import { ICreateAnimalDTO } from "@modules/animals/dtos/ICreateAnimalDTO";
import { IFindAnimalDTO } from "@modules/animals/dtos/IFindAnimalDTO";
import { Animal } from "@modules/animals/infra/typeorm/entities/Animal";

export interface IAnimalRepository {
  create: (data: ICreateAnimalDTO) => Promise<void>;
  findById: (id: string) => Promise<Animal>;
  deleteById: (id: string) => Promise<void>;
  listByInstitutionId: (
    institutionId: string,
    filterBy?: IFindAnimalDTO
  ) => Promise<Animal[]>;
  update: (id: string, data: Partial<Animal>) => Promise<Animal>;
}
