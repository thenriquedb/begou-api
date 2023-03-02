import { ClassValidationDetails } from "@shared/infra/adapters/validators/ClassValdiatorAdapter";

import { AppError } from "./AppError";

export class ValidationError extends AppError {
  constructor(data?: ClassValidationDetails) {
    super("Validation error", 400, data);
  }
}
