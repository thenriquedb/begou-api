import { RoleRepositoryFake } from "@tests/common/modules/accounts/repositories/RoleRepositoryFake";
import { describe, it, expect, beforeEach } from "@jest/globals";
import { ListRolesUseCase } from "@modules/accounts/useCases/ListRoles/ListRolesUseCase";
import { faker } from "@faker-js/faker";
import { BadRequestError } from "@shared/core/errors/BadRequestError";
import { CreateRoleUseCase } from "@modules/accounts/useCases/CreateRole/CreateRoleUseCase";

describe("ListRolesUseCase", () => {
  let listRolesUseCase: ListRolesUseCase;
  let roleRepositoryFake: RoleRepositoryFake;
  let createRoleUseCase: CreateRoleUseCase;

  beforeEach(() => {
    roleRepositoryFake = new RoleRepositoryFake();
    listRolesUseCase = new ListRolesUseCase(roleRepositoryFake);
    createRoleUseCase = new CreateRoleUseCase(roleRepositoryFake);
  });

  it("should return empty array if not exists roles created", async () => {
    const roles = await listRolesUseCase.execute();
    expect(roles.length).toEqual(0);
  });

  it("should create role correctly", async () => {
    let roles = await listRolesUseCase.execute();
    expect(roles.length).toEqual(0);

    await createRoleUseCase.execute({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
    });

    await createRoleUseCase.execute({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
    });

    await createRoleUseCase.execute({
      name: faker.lorem.word(),
      description: faker.lorem.sentence(),
    });

    roles = await listRolesUseCase.execute();
    expect(roles.length).toEqual(3);
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
