import { Repository } from "typeorm";

import { AppDataSource } from "@shared/infra/database/typeorm/data-source";

import { User } from "../../entities/User";
import { IUsersRepository } from "../IUserRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(data: Partial<User>) {
    const { email, name, password, phone_number } = data;

    const user = this.repository.create({
      email,
      name,
      password,
      phone_number,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findById(id: string) {
    const user = await this.repository.findOneBy({ id });
    return user;
  }
}
