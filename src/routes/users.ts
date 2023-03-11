import type { Router } from 'express-serve-static-core';
import { verifyBasicAuth } from '../middleware/auth';
import UserController from '../controllers/UserController';

const controller = new UserController;

export const useUserRoutes = (router: Router) => {
  router.get('/users', [verifyBasicAuth], controller.index.bind(controller));
  router.get('/users/:id', [verifyBasicAuth], controller.show.bind(controller));
  router.post('/users', [verifyBasicAuth], controller.store.bind(controller));
};