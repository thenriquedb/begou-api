import { inject, injectable } from "tsyringe";

import { ISpecieRepository } from "@modules/animals/repositories/ISpecieRepository";

@injectable()
export class ListSpeciesUseCase {
  private speciesRepository: ISpecieRepository;

  constructor(
    @inject("SpecieRepository")
    speciesRepository: ISpecieRepository
  ) {
    this.speciesRepository = speciesRepository;
  }

  async execute() {
    const species = await this.speciesRepository.list();
    return species;
  }
}
