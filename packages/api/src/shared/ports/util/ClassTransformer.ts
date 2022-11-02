export interface IClassTransformer<T> {
  create: (target: any, data: Partial<this>) => T;
}
