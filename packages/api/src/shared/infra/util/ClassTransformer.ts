import { ClassConstructor, plainToInstance } from "class-transformer";

export class ClassTransformer {
  public static plainToInstance<T>(target: ClassConstructor<T>, data: Partial<T>) {
    return plainToInstance(target, data);
  }
}
