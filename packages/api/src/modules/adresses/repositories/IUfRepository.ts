import { Uf } from "../entities/Uf";

export interface ICreateUfDTO {
  name: string;
  initials: string;
}

export interface IUfRepository {
  create: (data: ICreateUfDTO) => Promise<void>;
  findByInitials: (initials: string) => Promise<Uf>;
}
