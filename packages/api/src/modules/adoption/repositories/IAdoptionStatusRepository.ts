import { AdoptionStatus } from "../entities/AdoptionStatus";

export interface IAdoptionStatusRepository {
  findById: (id: string) => Promise<AdoptionStatus>;
  findByName: (name: string) => Promise<AdoptionStatus>;
}
