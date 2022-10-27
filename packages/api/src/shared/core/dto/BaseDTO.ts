import { ValidationError } from "@shared/core/errors/ValidationError";
import { ClassValidator } from "@shared/infra/validators/ClassValdiatorAdapter";

export abstract class BaseDTO {
  public abstract create(data: Partial<this>);

  public async validate() {
    const errors = await ClassValidator.validate(this);
    if (errors) {
      throw new ValidationError(errors);
    }
  }
}
