import { ICreateAdoptionDTO } from "@modules/adoption/dtos/ICreateAdoptionDTO";
import { IFindAdoptionRequest } from "@modules/adoption/dtos/IFindAdoptionRequest";

import { AdoptionRequest } from "../entities/AdoptionRequest";

export interface IAdoptionRequestRepository {
  create: (data: ICreateAdoptionDTO) => Promise<void>;
  findBy: (data: IFindAdoptionRequest) => Promise<AdoptionRequest>;
  listBy: (data: IFindAdoptionRequest) => Promise<AdoptionRequest[]>;
}
