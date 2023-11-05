import type { Collection, Document } from 'mongodb';
import type { Pagination, PaginationOptions } from '../interfaces/Pagination';
import { settings } from  '../config';

export class Paginator<T, D> {
  protected page: number;
  protected limit: number;
  protected query = '';
  protected url = '';
  protected project: T | undefined;

  constructor(
    protected collection: Collection<Document>,
    protected aggregation: Array<Record<string, unknown>>,
    protected options?: PaginationOptions<T>
  ) {
    this.page = options?.page ? options.page : 1;
    this.limit = options?.limit ? options.limit : 10;

    if (options?.url) {
      this.url = `${settings.app.url}/api${options.url}`
    }

    if (options?.query) {
      this.query = options.query;
    }

    if (options?.project) {
      this.project = options.project;
    }
  }

  async collect() {
    // fetch data + total count
    const data = (await this.getData()) as D[];

    const totalCount = data.length > 0 ? (await this.getTotalInfo()) as number : 0;
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / this.limit) : 1;

    // construct meta
    const meta: Pagination<D> = {
      data,
      first_page_url: this.getFirstPageUrl(),
      last_page_url: this.getLastPageUrl(totalPages),
      next_page_url: this.getNextPageUrl(totalPages),
      prev_page_url: this.getPreviousPageUrl(),
      path: this.url,
      per_page: this.limit,
      from: totalCount > 0 ? (this.page === 1 ? 1 : (this.page - 1) * this.limit + 1) : 0,
      to: this.page === totalPages ? totalCount : this.page * this.limit,
      total: totalCount,
      current_page: this.page,
      last_page: totalPages
    };

    return meta;
  }

  protected async getData() {
    const aggregation: Array<Record<string, unknown>> = [
      ...this.aggregation,
      { $skip : (this.page - 1) * this.limit },
      { $limit: this.limit }
    ];

    if (this.options?.project) {
      aggregation.push({
        $project: this.options?.project
      });
    }

    return await this.collection.aggregate(aggregation).toArray();
  }

  protected async getTotalInfo() {
    const [{totalCount}] = await this.collection.aggregate([
      ...this.aggregation,
      { $count: 'totalCount' }
    ]).toArray();

    return totalCount;
  }

  protected getFirstPageUrl() {
    return `${this.url}?${this.query ? this.query + '&' : ''}page=1`;
  }

  protected getLastPageUrl(lastPage: number) {
    return `${this.url}?${this.query ? this.query + '&' : ''}page=${lastPage}`;
  }

  protected getPreviousPageUrl() {
    if (this.page === 1) {
      return null;
    }
    return `${this.url}?${this.query ? this.query + '&' : ''}page=${this.page - 1}`;
  }

  protected getNextPageUrl(lastPage: number) {
    if (this.page === lastPage) {
      return null;
    }
    return `${this.url}?${this.query ? this.query + '&' : ''}page=${this.page + 1}`;
  }
}