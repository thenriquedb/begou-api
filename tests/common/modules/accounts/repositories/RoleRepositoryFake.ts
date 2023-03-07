import { Role } from "@modules/accounts/infra/typeorm/entities/Role";
import {
  ICreateRoleDTO,
  IRoleRepository,
} from "@modules/accounts/repositories/IRoleRepository";
import { UUID } from "@shared/infra/adapters/uuid/UUID";

export class RoleRepositoryFake implements IRoleRepository {
  private database: Role[] = [];

  async create(data: ICreateRoleDTO): Promise<void> {
    const { description, name } = data;

    this.database.push({
      created_at: new Date().toString(),
      description,
      name,
      id: UUID.generate(),
    });
  }

  async findByName(name: string): Promise<Role> {
    return this.database.find((role) => role.name === name);
  }

  async findById(id: string): Promise<Role> {
    return this.database.find((role) => role.id === id);
  }

  async list(): Promise<Role[]> {
    return this.database;
  }
}
