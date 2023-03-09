import type { Router } from 'express-serve-static-core';
import DeviceController from '../controllers/DeviceController';

const controller = new DeviceController;

export const useDeviceRoutes = (router: Router) => {
  router.get('/devices', controller.index);
  router.get('/devices/search', controller.search);
};