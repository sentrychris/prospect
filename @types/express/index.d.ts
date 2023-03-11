import type { JwtPayload } from 'jsonwebtoken';
import type { Aggregation } from '../../src/interfaces/Aggregation';

declare module 'express-serve-static-core' {
  export interface Request {
    $match?: Aggregation;
    user?: string | JwtPayload;
  }
}