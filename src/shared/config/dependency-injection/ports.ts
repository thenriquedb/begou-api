import { container } from "tsyringe";

import { BCryptAdapter } from "@shared/infra/adapters/cryptography/BcryptAdapter";
import { CepPromiseAdapter } from "@shared/infra/adapters/address-service/CepPromiseAdapter";
import { JWTAdapter } from "@shared/infra/adapters/jwt/JWTAdapter";
import type { IAddressService } from "@data/ports/address-service/IAddressService";
import { ITokenManager } from "@data/ports/cryptography/ITokenManager";
import { IEncoder } from "@data/ports/cryptography/IEncoder";

container.registerSingleton<IAddressService>("AddressService", CepPromiseAdapter);
container.registerSingleton<IEncoder>("Encoder", BCryptAdapter);
container.registerSingleton<ITokenManager>("TokenManager", JWTAdapter);
