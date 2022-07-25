export abstract class AbstractRepository<T> {
  abstract create(dto: T): Promise<T>;
  abstract getAll(): Promise<T[]>;
  abstract getOne(email: string): Promise<T>;
  abstract delete(id: string | number): Promise<any>;
  abstract update(id: string | number, dto: T): Promise<any>;
}
