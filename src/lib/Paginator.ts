import type { Collection, Document } from 'mongodb';
import { Pagination } from './interfaces/Pagination';
import { DeviceDocument } from './interfaces/Device';
import { Options } from './interfaces/Options';
import { settings } from  '../config';

export class Paginator<T> {
  protected page: number;
  protected limit: number;
  protected query = '';
  protected project: T | undefined;

  constructor(
    protected collection: Collection<Document>,
    protected baseAggregation: any[],
    protected options?: Options<T>
  ) {
    this.page = options?.page ? options.page : 1;
    this.limit = options?.limit ? options.limit : 10;

    if (options?.query) {
      this.query = options.query;
    }
    if (options?.project) {
      this.project = options.project;
    }
  }

  async collect() {
    // fetch data + total count
    const data = (await this.getData()) as DeviceDocument[];

    const totalCount = data.length > 0 ? (await this.getTotalInfo()) as number : 0;
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / this.limit) : 1;

    // construct meta
    const meta: Pagination<DeviceDocument> = {
      data,
      first_page_url: this.getFirstPageUrl(),
      last_page_url: this.getLastPageUrl(totalPages),
      next_page_url: this.getNextPageUrl(totalPages),
      prev_page_url: this.getPreviousPageUrl(),
      path: `${settings.app.url}/api/profiles`,
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
    const aggregationMerge = [
      ...this.baseAggregation,
      { $skip : (this.page - 1) * this.limit },
      { $limit: this.limit }
    ];

    if (this.options?.project) {
      aggregationMerge.push({
        $project: this.options?.project
      });
    }

    return await this.collection.aggregate(aggregationMerge).toArray();
  }

  protected async getTotalInfo() {
    const [{totalCount}] = await this.collection.aggregate([
      ...this.baseAggregation,
      { $count: 'totalCount' }
    ]).toArray();

    return totalCount;
  }

  protected getFirstPageUrl() {
    return `${settings.app.url}/api/devices?${this.query ? this.query + '&' : ''}page=1`;
  }

  protected getLastPageUrl(lastPage: number) {
    return `${settings.app.url}/api/devices?${this.query ? this.query + '&' : ''}page=${lastPage}`;
  }

  protected getPreviousPageUrl() {
    if (this.page === 1) {
      return null;
    }
    return `${settings.app.url}/api/devices?${this.query ? this.query + '&' : ''}page=${this.page - 1}`;
  }

  protected getNextPageUrl(lastPage: number) {
    if (this.page === lastPage) {
      return null;
    }
    return `${settings.app.url}/api/devices?${this.query ? this.query + '&' : ''}page=${this.page + 1}`;
  }
}