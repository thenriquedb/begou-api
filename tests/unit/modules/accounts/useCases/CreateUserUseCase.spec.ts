import { IEncoder } from "@data/ports/cryptography/IEncoder";
import { faker } from "@faker-js/faker";
import { describe, it, expect, beforeEach } from "@jest/globals";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { CreateUserUseCase } from "@modules/accounts/useCases/CreateUser/CreateUserUseCase";
import { ConflictError } from "@shared/core/errors/ConflictError";
import { BCryptAdapter } from "@shared/infra/adapters/cryptography/BcryptAdapter";
import { UsersRepositoryFake } from "@tests/common/modules/accounts/repositories/UsersRepository";

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;
  let usersRepository: IUsersRepository;
  let encoder: IEncoder;

  beforeEach(() => {
    usersRepository = new UsersRepositoryFake();
    encoder = new BCryptAdapter();
    createUserUseCase = new CreateUserUseCase(usersRepository, encoder);
  });

  it("should create user correctly", async () => {
    const email = faker.internet.email();

    await createUserUseCase.execute({
      email,
      name: faker.name.fullName(),
      password: faker.random.alphaNumeric(10),
      phone_number: faker.random.numeric(9),
    });

    const createdUser = await usersRepository.findByEmail(email);
    expect(createdUser).toBeTruthy();
  });

  it("should throw error if already exists some user with same email", async () => {
    const email = faker.internet.email();

    await createUserUseCase.execute({
      email,
      name: faker.name.fullName(),
      password: faker.random.alphaNumeric(10),
      phone_number: faker.random.numeric(9),
    });

    expect(async () => {
      await createUserUseCase.execute({
        email,
        name: faker.name.fullName(),
        password: faker.random.alphaNumeric(10),
        phone_number: faker.random.numeric(9),
      });
    }).rejects.toThrow(ConflictError);
  });

  it("should encode password correctly", async () => {
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(10);

    await createUserUseCase.execute({
      email,
      name: faker.name.fullName(),
      password,
      phone_number: faker.random.numeric(9),
    });

    const createdUser = await usersRepository.findByEmail(email);
    const passwordEquals = await encoder.compare(password, createdUser.password);

    expect(passwordEquals).toBeTruthy();
  });
});
