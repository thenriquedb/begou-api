import { Repository } from "typeorm";

import { ICreateAdoptionDTO } from "@modules/adoption/dtos/ICreateAdoptionDTO";
import { AdoptionRequest } from "@modules/adoption/entities/AdoptionRequest";
import { AppDataSource } from "@shared/infra/http/typeorm/data-source";

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

  async findById(id: string) {
    const adoptionRequest = await this.repository.findOne({
      where: {
        id,
      },
      relations: {
        animal: true,
        institution: true,
        status: true,
      },
    });

    return adoptionRequest;
  }

  async findByInstitutionId(institutionId: string) {
    const adoptionRequests = await this.repository.find({
      where: {
        institution: {
          id: institutionId,
        },
      },
      relations: {
        animal: true,
        institution: true,
        status: true,
      },
    });

    return adoptionRequests;
  }

  async findByUserId(userId: string) {
    const adoptionRequests = await this.repository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        animal: true,
        institution: true,
        status: true,
      },
    });

    return adoptionRequests;
  }
}
