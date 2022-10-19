import { Role } from "../entities/Role";

export interface ICreateRoleDTO {
  name: string;
  description: string;
}

export interface IRoleRepository {
  create: (data: ICreateRoleDTO) => Promise<void>;
  findByName: (name: string) => Promise<Role>;
  findById: (id: string) => Promise<Role>;
  list: () => Promise<Role[]>;
}
