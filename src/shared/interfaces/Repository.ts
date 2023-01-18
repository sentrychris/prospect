export interface Repository<K extends PropertyKey, T> {
    path: string;
    collection: Array<T>;
    store(
      type: string,
      {key, types, parser}: {key: K, types: Record<K, string[]>, parser: any}
    ): Promise<any>
    clearCollection(): void;
}