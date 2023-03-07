import { RoleRepositoryFake } from "@tests/common/modules/accounts/repositories/RoleRepositoryFake";
import { describe, it, expect, beforeEach } from "@jest/globals";
import { CreateRoleUseCase } from "@modules/accounts/useCases/CreateRole/CreateRoleUseCase";
import { faker } from "@faker-js/faker";
import { BadRequestError } from "@shared/core/errors/BadRequestError";

describe("CreateRoleUseCase", () => {
  let createRoleUseCase: CreateRoleUseCase;
  let roleRepositoryFake: RoleRepositoryFake;

  beforeEach(() => {
    roleRepositoryFake = new RoleRepositoryFake();
    createRoleUseCase = new CreateRoleUseCase(roleRepositoryFake);
  });

  it("should create role correctly", async () => {
    const name = faker.name.fullName();

    await createRoleUseCase.execute({
      name,
      description: faker.lorem.sentence(),
    });

    const createdRole = await roleRepositoryFake.findByName(name);
    expect(createdRole).toBeTruthy();
  });

  it("should throw error if aleready exists some role with same name", async () => {
    const name = faker.name.fullName();

    await createRoleUseCase.execute({
      name,
      description: faker.lorem.sentence(),
    });

    expect(async () => {
      await createRoleUseCase.execute({
        name,
        description: faker.lorem.sentence(),
      });
    }).rejects.toThrow(BadRequestError);
  });
});
