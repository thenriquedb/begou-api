import cepPromise from "cep-promise";

import {
  IAddressService,
  IAddressData,
} from "@data/protocols/address-service/IAddressService";
import { BrazilUfs } from "@shared/infra/zip-code/ufs";

export class CepPromiseAdapter implements IAddressService {
  async getAddressByZipCode(zipCode: string): Promise<IAddressData> {
    try {
      const address = await cepPromise(zipCode);

      return {
        city: address.city,
        neighborhood: address.neighborhood,
        state: address.state,
        street: address.street,
        zipCode: address.cep,
      };
    } catch (error) {
      console.log({ error });
      return null;
    }
  }

  getUfNameByInitials(initials: string): string {
    const initialsCasted = initials.toUpperCase();
    const uf = BrazilUfs[initialsCasted] as string;

    if (uf) return uf;

    throw new Error("Could not find the UF with the given initials");
  }
}
