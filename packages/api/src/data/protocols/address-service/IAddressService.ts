export interface IAddressData {
  zipCode: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
}

export interface IAddressService {
  getAddressByZipCode(zipCode: string): Promise<IAddressData | null>;
  getUfNameByInitials(initials: string): string;
}
