import { inject, injectable } from "tsyringe";

import { IInstitutionRepository } from "@modules/institutions/repositories/IInstitutionRepository";
import { IInstitutionAssociateRepository } from "@modules/institutions/repositories/IInstitutionAssociateRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUserRepository";
import { IRoleRepository } from "@modules/accounts/repositories/IRoleRepository";
import { BadRequestError } from "@shared/errors/BadRequestError";

interface IRequest {
  institution_id: string;
  associates?: {
    user_id: string;
    role_id: string;
  }[];
}

@injectable()
export class CreateInstitutionAssociateUseCase {
  private instituitionRepository: IInstitutionRepository;
  private usersRepository: IUsersRepository;
  private roleRepository: IRoleRepository;
  private institutionAssociateRepository: IInstitutionAssociateRepository;
  constructor(
    @inject("InstitutionRepository")
    instituitionRepository: IInstitutionRepository,
    @inject("UsersRepository")
    usersRepository: IUsersRepository,
    @inject("RoleRepository")
    roleRepository: IRoleRepository,
    @inject("InstitutionAssociateRepository")
    institutionAssociateRepository: IInstitutionAssociateRepository
  ) {
    this.instituitionRepository = instituitionRepository;
    this.usersRepository = usersRepository;
    this.roleRepository = roleRepository;
    this.institutionAssociateRepository = institutionAssociateRepository;
  }

  async execute({ institution_id, associates }: IRequest) {
    const instituition = await this.instituitionRepository.findById(
      institution_id
    );

    if (!instituition) {
      throw new BadRequestError("Institution not found");
    }

    associates.map(async (associate) => {
      const user = await this.usersRepository.findById(associate.user_id);
      const role = await this.roleRepository.findById(associate.role_id);
      const institution = await this.instituitionRepository.findById(
        institution_id
      );

      await this.institutionAssociateRepository.create({
        institution,
        associtate: {
          role,
          user,
        },
      });
    });
  }
}
