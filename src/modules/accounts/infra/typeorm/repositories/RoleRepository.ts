import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/database/typeorm/data-source";
import {
  ICreateRoleDTO,
  IRoleRepository,
} from "@modules/accounts/repositories/IRoleRepository";
import { Role } from "@modules/accounts/infra/typeorm/entities/Role";

export class RoleRepository implements IRoleRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = AppDataSource.getRepository(Role);
  }

  async create(data: ICreateRoleDTO) {
    const { name, description } = data;

    const role = this.repository.create({
      name,
      description,
    });

    await this.repository.save(role);
  }

  async findByName(name: string) {
    const role = this.repository.findOneBy({ name });
    return role;
  }

  async findById(id: string) {
    const role = this.repository.findOneBy({ id });
    return role;
  }

  async list() {
    const roles = await this.repository.find();
    return roles;
  }
}
