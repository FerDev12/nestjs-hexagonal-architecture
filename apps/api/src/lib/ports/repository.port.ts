export abstract class Repository<T> {
  abstract findById(id: string): Promise<T | null>;
  abstract findAll(): Promise<T[]>;
  abstract save(entity: T): Promise<{ id: string }>;
  abstract delete(entity: T): Promise<void>;
}
