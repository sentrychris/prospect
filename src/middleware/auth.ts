import type { RequestHandler } from 'express';
import { settings } from  '../config';
import { verify } from 'jsonwebtoken';

function extractAuthHeader(header: string | undefined, identifier = 'Bearer', decode = true): string {
  if (!header) {
    throw new Error();
  }

  const parts = header.split(' ');

  if (parts.length !== 2 || parts[0] !== identifier) {
    throw new Error();
  }

  try {
    return decode
      ? Buffer.from(parts[1], 'base64').toString()
      : parts[1];
  } catch (_) {
    throw new Error();
  }
}

export const verifyBasicAuth: RequestHandler = async(req, res, next) => {
  try {
    const decoded = extractAuthHeader(req.header('Authorization'));

    if (decoded !== settings.app.secret) {
      throw new Error();
    }

    next();
  } catch (_) {
    return res.sendStatus(401);
  }
};

export const verifyJWTAuth: RequestHandler = async(req, res, next) => {
  try {
    const token = extractAuthHeader(req.header('Authorization'), 'Bearer', false);
    const decoded = verify(token, settings.app.secret);

    req.user = decoded;
    
    next();
  } catch (_) {
    return res.sendStatus(401);
  }
};