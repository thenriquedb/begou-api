import { Repository } from "typeorm";

import { AdoptionStatus } from "@modules/adoption/entities/AdoptionStatus";
import { AppDataSource } from "@shared/infra/db/typeorm/data-source";

import { IAdoptionStatusRepository } from "../IAdoptionStatusRepository";

export class AdoptionStatusRepository implements IAdoptionStatusRepository {
  private repository: Repository<AdoptionStatus>;

  constructor() {
    this.repository = AppDataSource.getRepository(AdoptionStatus);
  }

  async findById(id: string) {
    const adoptionStatus = await this.repository.findOneBy({ id });
    return adoptionStatus;
  }

  async findByName(name: string) {
    const adoptionStatus = await this.repository.findOneBy({ name });
    return adoptionStatus;
  }
}
