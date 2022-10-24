import { ICreateAdoptionDTO } from "@modules/adoption/dtos/ICreateAdoptionDTO";

import { AdoptionRequest } from "../entities/AdoptionRequest";

export interface IAdoptionRequestRepository {
  create: (data: ICreateAdoptionDTO) => Promise<void>;
  findById: (id: string) => Promise<AdoptionRequest>;
  findByInstitutionId: (institutionId: string) => Promise<AdoptionRequest[]>;
  findByUserId: (userId: string) => Promise<AdoptionRequest[]>;
}
