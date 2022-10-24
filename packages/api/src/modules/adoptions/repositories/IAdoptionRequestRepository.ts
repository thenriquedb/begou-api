import { ICreateAdoptionDTO } from "@modules/adoptions/dtos/ICreateAdoptionDTO";
import { IFindAdoptionRequest } from "@modules/adoptions/dtos/IFindAdoptionRequest";
import { AdoptionStatus } from "@modules/adoptions/entities/AdoptionStatus";

import { AdoptionRequest } from "../entities/AdoptionRequest";

export interface IAdoptionRequestRepository {
  create: (data: ICreateAdoptionDTO) => Promise<void>;
  findBy: (data: IFindAdoptionRequest) => Promise<AdoptionRequest>;
  findById: (id: string) => Promise<AdoptionRequest>;
  listBy: (data: IFindAdoptionRequest) => Promise<AdoptionRequest[]>;
  updateStatus: (id: string, newStatus: AdoptionStatus) => Promise<AdoptionRequest>;
}
