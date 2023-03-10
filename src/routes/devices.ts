import type { Router } from 'express-serve-static-core';
import { verifyBasicAuth } from '../middleware/auth';
import DeviceController from '../controllers/DeviceController';

const controller = new DeviceController;

export const useDeviceRoutes = (router: Router) => {
  router.get('/devices', [verifyBasicAuth], controller.index);
  router.get('/devices/:id', [verifyBasicAuth], controller.show);
};