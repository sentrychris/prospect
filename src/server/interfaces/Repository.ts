export interface Repository<K, C> {
    path: string;
    collection: Array<C>;
    store(type: string, {key, types, parser}: {key: K, types: Record<any, Array<string>>, parser: any}): Promise<any>
    clearCollection(): void;
}