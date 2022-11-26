import cepPromise from "cep-promise";

import {
  IAddressData,
  AddressService,
} from "@shared/ports/address-service/IAddressService";

import { BrazilUfs } from "./ufs";

export class CepPromiseAdapter extends AddressService {
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
