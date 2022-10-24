/* eslint-disable prettier/prettier */
import { container } from "tsyringe";

import { BCryptAdapter } from "@shared/infra/cryptography/BcryptAdapter";
import { CepPromiseAdapter } from "@shared/infra/address-service/CepPromiseAdapter";
import { EmailValidator } from "@shared/infra/validators/EmailValidatorAdapter";
import { JWTEAdapter } from "@shared/infra/cryptography/JWTAdapter";
import type { IAddressService } from "@data/protocols/address-service/IAddressService";
import type { IEncoder } from "@data/protocols/cryptography/IEncoder";
import type { ITokenManager } from "@data/protocols/cryptography/ITokenManager";
import type { IEmailValidator } from "@validators/protocols/IEmailValidator";

container.registerSingleton<IAddressService>("AddressService", CepPromiseAdapter);
container.registerSingleton<IEmailValidator>("EmailValidator", EmailValidator);
container.registerSingleton<IEncoder>("Encoder", BCryptAdapter);
container.registerSingleton<ITokenManager>("TokenManager", JWTEAdapter);
