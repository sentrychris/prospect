import type { Router } from 'express-serve-static-core';
import { verifyBasicAuth } from '../middleware/auth';
import AuthController from '../controllers/AuthController';

const controller = new AuthController;

export const useAuthRoutes = (router: Router) => {
  router.post('/auth/login', [verifyBasicAuth], controller.login.bind(controller));
  router.post('/auth/register', [verifyBasicAuth], controller.register.bind(controller));
};