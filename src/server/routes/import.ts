import type { Router } from 'express-serve-static-core';
import { verifyBasicAuth } from '../middleware/auth';
import ImportController from '../controllers/ImportController';

const middleware = [verifyBasicAuth];
const controller = new ImportController;

export const useImportRoutes = (router: Router) => {
    router.get('/import/json', middleware, controller.json.bind(controller));
    router.get('/import/mongo', middleware, controller.mongo.bind(controller));
};