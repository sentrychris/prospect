import type { RequestHandler } from 'express';
import { settings } from  '../config';

function extractAuthHeader(header: string | undefined, identifier = 'Bearer'): string {
    if (!header) {
        throw new Error();
    }

    const parts = header.split(' ');

    if (parts.length !== 2 || parts[0] !== identifier) {
        throw new Error();
    }

    try {
        return Buffer.from(parts[1], 'base64').toString();
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