import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { Address } from "@modules/adresses/infra/typeorm/entities/Address";
import { City } from "@modules/adresses/infra/typeorm/entities/City";
import { Uf } from "@modules/adresses/infra/typeorm/entities/Uf";
import { Institution } from "@modules/institutions/infra/typeorm/entities/Institution";

export class InstitutionAddressSeeder implements Seeder {
  private async createDefaultUf(dataSource: DataSource) {
    const ufRepository = dataSource.getRepository(Uf);

    const uf = ufRepository.create({
      initials: "MG",
      name: "Minas Gerais",
    });

    await ufRepository.save(uf);

    return uf;
  }

  private async createDefaultCity(dataSource: DataSource) {
    const cityRepository = dataSource.getRepository(City);

    const city = cityRepository.create({
      name: "Ant City",
      zip_code: "35570084",
    });

    await cityRepository.save(city);

    return city;
  }

  async run(dataSource: DataSource, factoryManager: SeederFactoryManager) {
    const institutionRepository = dataSource.getRepository(Institution);
    const addressRepository = dataSource.getRepository(Address);

    const city = await this.createDefaultCity(dataSource);
    const uf = await this.createDefaultUf(dataSource);

    const address = addressRepository.create({
      street: "Rua XXX",
      complement: "",
      neighborhood: "Downtown",
      city,
      uf,
    });

    await addressRepository.save(address);

    const institution = await institutionRepository.findOneBy({
      name: "Ong de Teste",
    });
    institution.address = address;

    await institutionRepository.save(institution);
  }
}
