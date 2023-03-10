import { Aggregation } from '../../src/interfaces/Aggregation';

declare module 'express-serve-static-core' {
  export interface Request {
    $match?: Aggregation;
  }
}