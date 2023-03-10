import { Aggregation } from '../../src/lib/interfaces/Aggregation';

declare module 'express-serve-static-core' {
  export interface Request {
    $match?: Aggregation;
  }
}