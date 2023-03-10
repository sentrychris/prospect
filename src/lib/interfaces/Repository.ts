import type { Document } from 'mongodb';

export interface Repository {
  path: string;
  collection: Document[];
  clearCollection(): void;
}