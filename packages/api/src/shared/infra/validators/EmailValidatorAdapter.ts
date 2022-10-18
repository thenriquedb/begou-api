import { IEmailValidator } from "src/validators/protocols/IEmailValidator";
import validator from "validator";

export class EmailValidator implements IEmailValidator {
  validate(email: string): boolean {
    return validator.isEmail(email);
  }
}
