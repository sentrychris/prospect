import type { Router } from 'express-serve-static-core';
import { verifyBasicAuth } from '../middleware/auth';
import { parseQueryParams } from '../middleware/devices';
import ProfileController from '../controllers/ProfileController';

const controller = new ProfileController;

export const useProfileRoutes = (router: Router) => {
  router.get('/devices/profiles', [verifyBasicAuth, parseQueryParams], controller.index.bind(controller));
  router.get('/devices/profiles/:id', [verifyBasicAuth], controller.show.bind(controller));
  router.post('/devices/profiles', [verifyBasicAuth], controller.store.bind(controller));
};