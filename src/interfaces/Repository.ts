import type { Request } from 'express';
import type { Document, WithId } from 'mongodb';

export interface MongoRepository<T> {
  collection: Document[];
  search(req: Request): Promise<Document[]>;
  get(req: Request): Promise<WithId<Document> | null>;
  store(data: T): Promise<Document[]>;
  clearCollection(): void;
}

export interface SqlRepository<T> {
  search(req: Request): Promise<Array<T>>;
  get(req: Request): Promise<T | null>;
  store(req: Request): Promise<T>;
  verify(req: Request): Promise<T | boolean>;
}