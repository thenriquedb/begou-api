import { Repository } from "typeorm";

import { ICreateAdoptionDTO } from "@modules/adoption/dtos/ICreateAdoptionDTO";
import { AdoptionRequest } from "@modules/adoption/entities/AdoptionRequest";
import { AppDataSource } from "@shared/infra/db/typeorm/data-source";
import { IFindAdoptionRequest } from "@modules/adoption/dtos/IFindAdoptionRequest";

import { IAdoptionRequestRepository } from "../IAdoptionRequestRepository";

export class AdoptionRequestRepository implements IAdoptionRequestRepository {
  private repository: Repository<AdoptionRequest>;

  constructor() {
    this.repository = AppDataSource.getRepository(AdoptionRequest);
  }

  async create(data: ICreateAdoptionDTO) {
    const { animal, institution, status, user } = data;

    const adoptionRequest = this.repository.create({
      animal,
      institution,
      status,
      user,
    });

    await this.repository.save(adoptionRequest);
  }

  async findBy(data: IFindAdoptionRequest) {
    const { animal_id, institution_id, user_id } = data;

    const adoptionRequest = await this.repository.findOne({
      where: {
        user: {
          id: user_id,
        },
        animal: {
          id: animal_id,
        },
        institution: {
          id: institution_id,
        },
      },
      relations: {
        animal: true,
        institution: true,
        status: true,
      },
    });

    return adoptionRequest;
  }

  async listBy(data: IFindAdoptionRequest) {
    const { animal_id, institution_id, user_id } = data;

    const adoptionRequest = await this.repository.find({
      where: {
        user: {
          id: user_id,
        },
        animal: {
          id: animal_id,
        },
        institution: {
          id: institution_id,
        },
      },
      relations: {
        animal: true,
        institution: true,
        status: true,
      },
    });

    return adoptionRequest;
  }
}
