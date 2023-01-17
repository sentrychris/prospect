import type { Repository } from './Repository';

export interface Importer<K extends PropertyKey, C> {
    repository: Repository<K, C>;
    json(): Promise<C | Array<C>>;
    mongo(): Promise<C | Array<C>>;
}