import type { Request } from 'express';
import type { Repository } from './Repository';

export interface Importer<T> {
    repository: Repository<T>;
    mongo(req: Request): Promise<T | Array<T>>;
}