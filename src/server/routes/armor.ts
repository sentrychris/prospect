import type { Router } from 'express-serve-static-core';
import ArmorController from '../controllers/ArmorController';

const controller = new ArmorController;

export const useArmorRoutes = (router: Router) => {
  router.get('/armor', controller.index);
  router.get('/armor/search', controller.search);
};