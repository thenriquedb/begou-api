import { inject, injectable } from "tsyringe";

import { IRoleRepository } from "@modules/accounts/repositories/IRoleRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateRoleUseCase {
  private roleRepository: IRoleRepository;

  constructor(
    @inject("RoleRepository")
    roleRepository: IRoleRepository
  ) {
    this.roleRepository = roleRepository;
  }

  async execute({ name, description }: IRequest) {
    const roleAlreadyExists = await this.roleRepository.findByName(name);

    if (roleAlreadyExists) {
      throw new AppError("Role already exists");
    }

    await this.roleRepository.create({ name, description });
  }
}
