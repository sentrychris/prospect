import type { Repository } from './Repository';

export interface Importer<K, C> {
    repository: Repository<K, C>;
    json(key?: unknown | null): Promise<C | Array<C>>;
    mongo(key?: unknown | null): Promise<C | Array<C>>;
}