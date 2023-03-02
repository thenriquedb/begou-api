import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/database/typeorm/data-source";
import { Uf } from "@modules/adresses/infra/typeorm/entities/Uf";
import { IUfRepository } from "@modules/adresses/repositories/IUfRepository";
import { ICreateUfDTO } from "@modules/adresses/dtos/ICreateUfDTO";

export class UfRepository implements IUfRepository {
  private repository: Repository<Uf>;

  constructor() {
    this.repository = AppDataSource.getRepository(Uf);
  }

  async create(data: ICreateUfDTO) {
    const { initials, name } = data;

    const uf = this.repository.create({ initials, name });

    await this.repository.save(uf);
  }

  async findByInitials(initials: string) {
    const uf = await this.repository.findOneBy({ initials });
    return uf;
  }
}
