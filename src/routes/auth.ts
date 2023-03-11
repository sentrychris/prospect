import type { Router } from 'express-serve-static-core';
import AuthController from '../controllers/AuthController';

const controller = new AuthController;

export const useAuthRoutes = (router: Router) => {
  router.post('/auth/login', controller.login.bind(controller));
  router.post('/auth/register', controller.register.bind(controller));
};