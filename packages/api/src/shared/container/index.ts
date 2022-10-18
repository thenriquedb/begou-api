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
import { IAddressRepository } from "@modules/adresses/repositories/IAddressRepository";
import { AddressRepository } from "@modules/adresses/repositories/implementations/AddressRepository";
import { ICityRepository } from "@modules/adresses/repositories/ICityRepository";
import { CityRepository } from "@modules/adresses/repositories/implementations/CityRepository";
import { IUfRepository } from "@modules/adresses/repositories/IUfRepository";
import { UfRepository } from "@modules/adresses/repositories/implementations/UfRepository";
import { IAddressService } from "@data/protocols/address-service/IAddressService";
import { IEncoder } from "@data/protocols/cryptography/IEncoder";
import { CepPromiseAdapter } from "@shared/infra/zip-code/CepPromiseAdapter";
import { BCryptAdapter } from "@shared/infra/cryptography/BcryptAdapter";
import { IEmailValidator } from "@validators/protocols/IEmailValidator";
import { EmailValidator } from "@shared/infra/validators/EmailValidatorAdapter";
import { ITokenManager } from "@data/protocols/cryptography/ITokenManager";
import { JWTEAdapter } from "@shared/infra/cryptography/JWTAdapter";

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
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<IAddressService>(
  "AddressService",
  CepPromiseAdapter
);

container.registerSingleton<IEncoder>("Encoder", BCryptAdapter);
container.registerSingleton<IEmailValidator>("EmailValidator", EmailValidator);
container.registerSingleton<ITokenManager>("TokenManager", JWTEAdapter);
