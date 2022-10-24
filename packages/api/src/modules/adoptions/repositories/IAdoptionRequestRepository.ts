import { ICreateAdoptionDTO } from "@modules/adoption/dtos/ICreateAdoptionDTO";
import { IFindAdoptionRequest } from "@modules/adoption/dtos/IFindAdoptionRequest";
import { AdoptionStatus } from "@modules/adoption/entities/AdoptionStatus";

import { AdoptionRequest } from "../entities/AdoptionRequest";

export interface IAdoptionRequestRepository {
  create: (data: ICreateAdoptionDTO) => Promise<void>;
  findBy: (data: IFindAdoptionRequest) => Promise<AdoptionRequest>;
  findById: (id: string) => Promise<AdoptionRequest>;
  listBy: (data: IFindAdoptionRequest) => Promise<AdoptionRequest[]>;
  updateStatus: (id: string, newStatus: AdoptionStatus) => Promise<AdoptionRequest>;
}
