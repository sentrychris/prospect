import type { Router } from 'express-serve-static-core';
import { verifyBasicAuth } from '../middleware/auth';
import ImportController from '../controllers/ImportController';

const middleware = [verifyBasicAuth];
const controller = new ImportController;

export const useImportRoutes = (router: Router) => {
    router.post('/import/json/:key/:subKey?', middleware, controller.json.bind(controller));
    router.post('/import/mongo/:key/:subKey?', middleware, controller.mongo.bind(controller));
};