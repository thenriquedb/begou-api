import { DataSource, Repository } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { faker } from "@faker-js/faker";
import { Animal } from "@modules/animals/infra/typeorm/entities/Animal";
import { StageOfLife } from "@modules/animals/infra/typeorm/entities/StageOfLife";
import { Institution } from "@modules/institutions/entities/Institution";
import { Specie } from "@modules/animals/infra/typeorm/entities/Specie";
import { AnimalSize } from "@modules/animals/infra/typeorm/entities/AnimalSize";
import { AnimalPersonality } from "@modules/animals/infra/typeorm/entities/AnimalPersonality";
import { AnimalHealth } from "@modules/animals/infra/typeorm/entities/AnimalHealth";
import { AnimalGenre } from "@modules/animals/enums/Genre";

export class AnimalSeeder implements Seeder {
  private animalRepository: Repository<Animal>;

  private async generateRandomAnimal(dataSource: DataSource) {
    const animalRepository = dataSource.getRepository(Animal);
    const animalHealthRepository = dataSource.getRepository(AnimalHealth);
    const animalPersonalityRepository = dataSource.getRepository(AnimalPersonality);
    const animalSizesRepository = dataSource.getRepository(AnimalSize);
    const specieRepository = dataSource.getRepository(Specie);
    const institutionRepository = dataSource.getRepository(Institution);
    const stageOfLifeRepository = dataSource.getRepository(StageOfLife);

    const healths = await animalHealthRepository.find();
    const personalities = await animalPersonalityRepository.find();
    const size = (await animalSizesRepository.find()).at(0);
    const institution = (await institutionRepository.find()).at(0);
    const specie = (await specieRepository.find()).at(0);
    const stage_of_life = (await stageOfLifeRepository.find()).at(0);

    return animalRepository.create({
      description: faker.lorem.lines(),
      genre: AnimalGenre.FEMALE,
      healths,
      institution,
      name: faker.name.firstName(),
      personalities,
      size,
      specie,
      stage_of_life,
    });
  }
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    this.animalRepository = dataSource.getRepository(Animal);

    const animal_1 = await this.generateRandomAnimal(dataSource);
    const animal_2 = await this.generateRandomAnimal(dataSource);
    const animal_3 = await this.generateRandomAnimal(dataSource);
    const animal_4 = await this.generateRandomAnimal(dataSource);

    await this.animalRepository.save(animal_1);
    await this.animalRepository.save(animal_2);
    await this.animalRepository.save(animal_3);
    await this.animalRepository.save(animal_4);
  }
}
