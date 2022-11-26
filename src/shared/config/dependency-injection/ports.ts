import { container } from "tsyringe";

import { BCryptAdapter } from "@shared/infra/cryptography/BcryptAdapter";
import { CepPromiseAdapter } from "@shared/infra/address-service/CepPromiseAdapter";
import { JWTAdapter } from "@shared/infra/cryptography/JWTAdapter";
import type { IAddressService } from "@shared/ports/address-service/IAddressService";
import type { IEncoder } from "@shared/ports/cryptography/IEncoder";
import type { ITokenManager } from "@shared/ports/cryptography/ITokenManager";

container.registerSingleton<IAddressService>("AddressService", CepPromiseAdapter);
container.registerSingleton<IEncoder>("Encoder", BCryptAdapter);
container.registerSingleton<ITokenManager>("TokenManager", JWTAdapter);
