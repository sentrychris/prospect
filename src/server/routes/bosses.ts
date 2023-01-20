import type { Router } from 'express-serve-static-core';
import BossesController from '../controllers/BossesController';

const controller = new BossesController;

export const useBossesRoutes = (router: Router) => {
  router.get('/bosses', controller.index);
  router.get('/bosses/search', controller.search);
};