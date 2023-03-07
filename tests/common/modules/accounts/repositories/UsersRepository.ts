import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { UUID } from "@shared/infra/adapters/uuid/UUID";

export class UsersRepositoryFake implements IUsersRepository {
  private database: User[] = [];

  async create(data: User): Promise<void> {
    const { email, name, password, phone_number } = data;

    this.database.push({
      id: UUID.generate(),
      email,
      name,
      password,
      phone_number,
      created_at: new Date(),
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.database.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.database.find((user) => user.id === id);
  }
}
