export interface Parser<T, U> {
  fetchSource(key: string): Promise<T>;
  parseData(): Promise<Array<U> | false>;
}