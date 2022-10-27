import { validate } from "class-validator";

export type ClassValidationErrors = {
  property: string;
  message: string[];
};

export type ClassValidationDetails = {
  context: string;
  errors: ClassValidationErrors[];
};

export class ClassValidator {
  public static async validate<T extends object>(target: T) {
    const details: ClassValidationDetails = {
      context: target.constructor.name,
      errors: [],
    };

    const errors = await validate(target, {
      stopAtFirstError: true,
      validationError: { target: false },
    });

    details.context = target.constructor.name;

    if (errors) {
      details.errors = errors.map((error) => ({
        property: error.property,
        message: error.constraints ? Object.values(error.constraints) : [],
      }));

      return details;
    }

    return null;
  }
}
