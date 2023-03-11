import type { Router } from 'express-serve-static-core';
import { verifyJWTAuth } from '../middleware/auth';
import { parseQueryParams } from '../middleware/devices';
import DeviceController from '../controllers/DeviceController';

const controller = new DeviceController;

export const useDeviceRoutes = (router: Router) => {
  router.get('/devices', [verifyJWTAuth, parseQueryParams], controller.index.bind(controller));
  router.get('/devices/:id', [verifyJWTAuth], controller.show.bind(controller));
  router.post('/devices', [verifyJWTAuth], controller.store.bind(controller));
};