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
  collection: Document[];
  search(req: Request): Promise<any>;
  get(req: Request): Promise<any>;
  store(data: T): Promise<any>;
  verify(req: Request): Promise<boolean | T>;
  clearCollection(): void;
}