import { container } from "tsyringe";

import { IAnimalSizesRepository } from "@modules/animals/repositories/IAnimalSizeRepository";
import { IAnimalPersonalityRepository } from "@modules/animals/repositories/IAnimalPersonalityRepository";
import { IAnimalHealthRepository } from "@modules/animals/repositories/IAnimalHealthRepository";
import { AnimalSizesRepository } from "@modules/animals/repositories/implementations/AnimalSizesRepository";
import { AnimalPersonalityRepository } from "@modules/animals/repositories/implementations/AnimalPersonalityRepository";
import { AnimalHealthRepository } from "@modules/animals/repositories/implementations/AnimalHealthRepository";
import { IRoleRepository } from "@modules/accounts/repositories/IRoleRepository";
import { RoleRepository } from "@modules/accounts/repositories/implementations/RoleRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UserRepository";
import { IInstitutionAddressRepository } from "@modules/adresses/repositories/IInstitutionAddressRepository";
import { InstitutionAddressRepository } from "@modules/adresses/repositories/implementations/InstitutionAddressRepository";
import { ICityRepository } from "@modules/adresses/repositories/ICityRepository";
import { CityRepository } from "@modules/adresses/repositories/implementations/CityRepository";
import { IUfRepository } from "@modules/adresses/repositories/IUfRepository";
import { UfRepository } from "@modules/adresses/repositories/implementations/UfRepository";
import { IAddressService } from "@data/protocols/address-service/IAddressService";
import { IEncoder } from "@data/protocols/cryptography/IEncoder";
import { CepPromiseAdapter } from "@shared/infra/address-service/CepPromiseAdapter";
import { BCryptAdapter } from "@shared/infra/cryptography/BcryptAdapter";
import { IEmailValidator } from "@validators/protocols/IEmailValidator";
import { EmailValidator } from "@shared/infra/validators/EmailValidatorAdapter";
import { ITokenManager } from "@data/protocols/cryptography/ITokenManager";
import { JWTEAdapter } from "@shared/infra/cryptography/JWTAdapter";
import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";
import { InstitutionRepository } from "@modules/institutions/repositories/implementations/InstitutionRepository";
import { IInstitutionAssociateRepository } from "@modules/institutions/repositories/IInstitutionAssociateRepository";
import { InstitutionAssociateRepository } from "@modules/institutions/repositories/implementations/InstitutionAssociateRepository";
import { IAnimalRepository } from "@modules/animals/repositories/IAnimalRepository";
import { AnimalRepository } from "@modules/animals/repositories/implementations/AnimalRepository";
import { ISpecieRepository } from "@modules/animals/repositories/ISpecieRepository";
import { SpecieRepository } from "@modules/animals/repositories/implementations/SpecieRepository";
import { IStageOfLifeRepository } from "@modules/animals/repositories/IStageOfLifeRepository";
import { StageOfLifeRepository } from "@modules/animals/repositories/implementations/StageOfLifeRepository";
import { IAdoptionRequestRepository } from "@modules/adoption/repositories/IAdoptionRequestRepository";
import { AdoptionRequestRepository } from "@modules/adoption/repositories/implementations/AdoptionRequestRepository";
import { IAdoptionStatusRepository } from "@modules/adoption/repositories/IAdoptionStatusRepository";
import { AdoptionStatusRepository } from "@modules/adoption/repositories/implementations/AdoptionStatusRepository";

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

container.registerSingleton<ISpecieRepository>(
  "SpecieRepository",
  SpecieRepository
);

container.registerSingleton<IStageOfLifeRepository>(
  "StageOfLifeRepository",
  StageOfLifeRepository
);

container.registerSingleton<IUfRepository>("UfRepository", UfRepository);
container.registerSingleton<ICityRepository>("CityRepository", CityRepository);
container.registerSingleton<IInstitutionAddressRepository>(
  "InstitutionAddressRepository",
  InstitutionAddressRepository
);

container.registerSingleton<IRoleRepository>("RoleRepository", RoleRepository);
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IInstitutionRepository>(
  "InstitutionRepository",
  InstitutionRepository
);

container.registerSingleton<IInstitutionAssociateRepository>(
  "InstitutionAssociateRepository",
  InstitutionAssociateRepository
);

container.registerSingleton<IAnimalRepository>(
  "AnimalRepository",
  AnimalRepository
);

container.registerSingleton<IAdoptionRequestRepository>(
  "AdoptionRequestRepository",
  AdoptionRequestRepository
);

container.registerSingleton<IAdoptionStatusRepository>(
  "AdoptionStatusRepository",
  AdoptionStatusRepository
);

container.registerSingleton<IAddressService>(
  "AddressService",
  CepPromiseAdapter
);

container.registerSingleton<IEncoder>("Encoder", BCryptAdapter);
container.registerSingleton<IEmailValidator>("EmailValidator", EmailValidator);
container.registerSingleton<ITokenManager>("TokenManager", JWTEAdapter);
