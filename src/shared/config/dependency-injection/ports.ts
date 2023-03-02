import { container } from "tsyringe";

import { BCryptAdapter } from "@shared/infra/cryptography/BcryptAdapter";
import { CepPromiseAdapter } from "@shared/infra/address-service/CepPromiseAdapter";
import { JWTAdapter } from "@shared/infra/jwt/JWTAdapter";
import type { IAddressService } from "@data/protocols/address-service/IAddressService";
import { ITokenManager } from "@data/protocols/cryptography/ITokenManager";
import { IEncoder } from "@data/protocols/cryptography/IEncoder";

container.registerSingleton<IAddressService>("AddressService", CepPromiseAdapter);
container.registerSingleton<IEncoder>("Encoder", BCryptAdapter);
container.registerSingleton<ITokenManager>("TokenManager", JWTAdapter);
