import { Collection } from 'mongodb';
import { Pagination } from './interfaces/Pagination';
import ProfileInterface from '../interfaces/ProfileInterface';
import OptionsInterface from '../interfaces/OptionsInterface';
import { settings } from  '../config';

const DEFAULT_OFFSET = 10;

export class Paginator<T> {
  protected page: number;
  protected query = '';
  protected project: T | undefined;

  constructor(
    protected collection: Collection<Document>,
    protected baseAggregation: any[],
    protected options?: OptionsInterface<T>
  ) {
    this.page = options?.page ? options.page : 1;
    if (options?.query) {
      this.query = options.query;
    }
    if (options?.project) {
      this.project = options.project;
    }
  }

  async collect() {
    // fetch data + total count
    const data = (await this.getData()) as ProfileInterface[];
    const totalCount = data.length > 0 ? (await this.getTotalInfo()) as number : 0;
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / DEFAULT_OFFSET) : 1;

    // construct meta
    const meta: Pagination<ProfileInterface> = {
      data,
      first_page_url: this.getFirstPageUrl(),
      last_page_url: this.getLastPageUrl(totalPages),
      next_page_url: this.getNextPageUrl(totalPages),
      prev_page_url: this.getPreviousPageUrl(),
      path: `${settings.app.url}/api/profiles`,
      per_page: DEFAULT_OFFSET,
      from: totalCount > 0 ? (this.page === 1 ? 1 : (this.page - 1) * DEFAULT_OFFSET + 1) : 0,
      to: this.page === totalPages ? totalCount : this.page * DEFAULT_OFFSET,
      total: totalCount,
      current_page: this.page,
      last_page: totalPages
    };

    return meta;
  }

  protected async getData() {
    const aggregationMerge = [
      ...this.baseAggregation,
      {
        $skip : (this.page - 1) * DEFAULT_OFFSET
      },
      {
        $limit: DEFAULT_OFFSET
      }
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
      {
        $count: 'totalCount'
      }
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