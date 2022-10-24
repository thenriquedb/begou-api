import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/db/typeorm/data-source";

import { Role } from "../../entities/Role";
import { IRoleRepository, ICreateRoleDTO } from "../IRoleRepository";

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
