export interface Repository<T> {
    path: string;
    collection: T[];
    clearCollection(): void;
}