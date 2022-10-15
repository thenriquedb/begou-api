import { inject, injectable } from "tsyringe";

import { IRoleRepository } from "@modules/accounts/repositories/IRoleRepository";

@injectable()
export class ListRolesUseCase {
  private roleRepository: IRoleRepository;

  constructor(
    @inject("RoleRepository")
    roleRepository: IRoleRepository
  ) {
    this.roleRepository = roleRepository;
  }

  async execute() {
    const roles = await this.roleRepository.list();
    return roles;
  }
}
