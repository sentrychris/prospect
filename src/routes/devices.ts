import type { Router } from 'express-serve-static-core';
import { verifyBasicAuth } from '../middleware/auth';
import DeviceController from '../controllers/DeviceController';

const controller = new DeviceController;

export const useDeviceRoutes = (router: Router) => {
  router.get('/devices', [verifyBasicAuth], controller.index.bind(controller));
  router.post('/devices', [verifyBasicAuth], controller.store.bind(controller));
  router.get('/devices/:id', [verifyBasicAuth], controller.show.bind(controller));
};