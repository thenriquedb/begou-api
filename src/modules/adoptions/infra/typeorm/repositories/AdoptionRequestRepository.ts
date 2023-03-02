import { Repository } from "typeorm";

import { ICreateAdoptionDTO } from "@modules/adoptions/dtos/ICreateAdoptionDTO";
import { AdoptionRequest } from "@modules/adoptions/infra/typeorm/entities/AdoptionRequest";
import { AppDataSource } from "@shared/infra/database/typeorm/data-source";
import { IFindAdoptionRequest } from "@modules/adoptions/dtos/IFindAdoptionRequest";
import { AdoptionStatus } from "@modules/adoptions/infra/typeorm/entities/AdoptionStatus";
import { IAdoptionRequestRepository } from "@modules/adoptions/repositories/IAdoptionRequestRepository";

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

  async findById(id: string) {
    const adoptionRequest = await this.repository.findOne({
      where: { id },
      relations: {
        animal: true,
        user: true,
        institution: true,
        status: true,
      },
    });

    return adoptionRequest;
  }

  async updateStatus(id: string, newStatus: AdoptionStatus) {
    const adoptionRequest = await this.findById(id);

    adoptionRequest.status = newStatus;

    this.repository.save(adoptionRequest);

    return adoptionRequest;
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
