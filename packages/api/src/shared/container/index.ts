import { container } from "tsyringe";

import { IAnimalSizesRepository } from "@modules/animals/repositories/IAnimalSizeRepository";
import { IAnimalPersonalityRepository } from "@modules/animals/repositories/IAnimalPersonalityRepository";
import { IAnimalHealthRepository } from "@modules/animals/repositories/IAnimalHealthRepository";
import { AnimalSizesRepository } from "@modules/animals/repositories/implementations/AnimalSizesRepository";
import { AnimalPersonalityRepository } from "@modules/animals/repositories/implementations/AnimalPersonalityRepository";
import { AnimalHealthRepository } from "@modules/animals/repositories/implementations/AnimalHealthRepository";
import { IRoleRepository } from "@modules/accounts/repositories/IRoleRepository";
import { RoleRepository } from "@modules/accounts/repositories/implementations/RoleRepository";
import { IAddressRepository } from "@modules/adresses/repositories/IAddressRepository";
import { AddressRepository } from "@modules/adresses/repositories/implementations/AddressRepository";
import { ICityRepository } from "@modules/adresses/repositories/ICityRepository";
import { CityRepository } from "@modules/adresses/repositories/implementations/CityRepository";
import { IUfRepository } from "@modules/adresses/repositories/IUfRepository";
import { UfRepository } from "@modules/adresses/repositories/implementations/UfRepository";
import { IAddressService } from "@data/protocols/address-service/IAddressService";
import { CepPromiseAdapter } from "@shared/infra/zip-code/CepPromiseAdapter";

container.registerSingleton<IAnimalSizesRepository>(
  "AnimalSizesRepository",
  AnimalSizesRepository
);

container.registerSingleton<IAnimalPersonalityRepository>(
  "AnimalPersonalityRepository",
  AnimalPersonalityRepository
);

container.registerSingleton<IAnimalHealthRepository>(
  "AnimalHealthRepository",
  AnimalHealthRepository
);

container.registerSingleton<IUfRepository>("UfRepository", UfRepository);
container.registerSingleton<ICityRepository>("CityRepository", CityRepository);
container.registerSingleton<IAddressRepository>(
  "AddressRepository",
  AddressRepository
);

container.registerSingleton<IRoleRepository>("RoleRepository", RoleRepository);
container.registerSingleton<IAddressService>(
  "AddressService",
  CepPromiseAdapter
);
