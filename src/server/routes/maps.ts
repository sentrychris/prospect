import type { Router } from 'express-serve-static-core';
import MapsController from '../controllers/MapsController';

const controller = new MapsController;

export const useMapsRoutes = (router: Router) => {
    router.get('/maps', controller.index);
    router.get('/maps/search', controller.search);
};