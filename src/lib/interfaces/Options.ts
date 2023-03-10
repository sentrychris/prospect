export interface Options<T> {
  page?: number;
  limit?: number;
  query?: string;
  project?: T
}