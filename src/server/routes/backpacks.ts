import type { Router } from 'express-serve-static-core';
import BackpacksController from '../controllers/BackpacksController';

const controller = new BackpacksController;

export const useBackpacksRoutes = (router: Router) => {
    router.get('/backpacks', controller.index);
    router.get('/backpacks/search', controller.search);
};