import { ClassConstructor, plainToInstance } from "class-transformer";

export class ClassTransformer {
  public static create<T>(target: ClassConstructor<T>, data: Partial<T>) {
    return plainToInstance(target, data);
  }
}
