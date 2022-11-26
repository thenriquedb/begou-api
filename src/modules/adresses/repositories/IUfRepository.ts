import { Uf } from "../entities/Uf";
import { ICreateUfDTO } from "../dtos/ICreateUfDTO";

export interface IUfRepository {
  create: (data: ICreateUfDTO) => Promise<void>;
  findByInitials: (initials: string) => Promise<Uf>;
}
