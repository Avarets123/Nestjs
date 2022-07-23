export abstract class AbstractRepository<T> {
  abstract create(dto: T): Promise<T>;
  abstract getAll(): Promise<T[]>;
  abstract getOne(id: string | number): Promise<T>;
  abstract delete(id: string | number): Promise<any>;
  abstract update(id: string | number, dto: T): Promise<any>;
}
