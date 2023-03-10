import type { Request } from 'express';
import type { Document, WithId } from 'mongodb';

export interface Repository<T> {
  path: string;
  collection: Document[];
  search(req: Request): Promise<Document[]>;
  get(req: Request): Promise<WithId<Document> | null>;
  store(data: T): Promise<Document[]>;
  clearCollection(): void;
}