import { RequestHandler } from 'express';
import { Aggregation } from '../lib/interfaces/Aggregation';

export const parseQueryParams: RequestHandler = async(req, res, next) => {
  const platforms = req.query.platforms
    ? (req.query.platforms as string).split(',')
    : [];

  const hostname = req.query.hostname
    ? req.query.hostname as string
    : '';
  
  const $match: Aggregation = {};

  if (platforms.length) {
    $match['os.platform'] = {
      $in: platforms 
    };
  }

  if (hostname.length) {
    $match['hostname'] = {
      $regex: new RegExp(hostname, 'i')
    };
  }

  req.$match = $match;

  next();
};