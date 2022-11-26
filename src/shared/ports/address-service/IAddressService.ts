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
  zipCodeIsValid(zipCodeRaw: string): boolean;
}

export abstract class AddressService implements IAddressService {
  abstract getAddressByZipCode(zipCode: string): Promise<IAddressData | null>;
  abstract getUfNameByInitials(initials: string): string;

  private removeInvalidCharacters(zipCodeRaw: string) {
    return zipCodeRaw.toString().replace(/\D+/g, "");
  }

  public zipCodeIsValid(zipCodeRaw: string) {
    const cleanZipCode = this.removeInvalidCharacters(zipCodeRaw);
    const ZIP_CODE_LENGTH = 8;
    return cleanZipCode.length < ZIP_CODE_LENGTH;
  }
}
