import { Request, Response, NextFunction } from "express";

import { AssociateRole } from "@modules/institutions/enums/AssociateRole";
import { ForbiddenError } from "@shared/core/errors/ForbiddenError";
import { InstitutionAssociateRepository } from "@modules/institutions/infra/typeorm/repositories/InstitutionAssociateRepository";

const institutionAssociateRepository = new InstitutionAssociateRepository();

export function canBe(userRoles: AssociateRole[]) {
  return async (request: Request, _: Response, next: NextFunction) => {
    const { institution_id } = request.params;
    const { user } = request;

    const associate = await institutionAssociateRepository.findBy({
      user_id: user.id,
      institution_id,
    });

    if (!associate) {
      throw new ForbiddenError("User is not a associate of the institution");
    }

    const hasPermission = userRoles.some((role) => associate.role.name === role);

    if (!hasPermission) {
      throw new ForbiddenError("You do not have permission to execute this action");
    }

    next();
  };
}
