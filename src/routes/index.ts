import express, { type Response } from 'express';
import { useUserRoutes } from './users';
import { useAuthRoutes } from './auth';
import { useProfileRoutes } from './profiles';
import { useDeviceRoutes } from './devices'; 

/**
 * setup router
 */
const router = express.Router();

/**
 * Application routes
 */
useUserRoutes(router);
useAuthRoutes(router);
useProfileRoutes(router);
useDeviceRoutes(router);

router.get('/health', (_, res: Response) => res.sendStatus(200));

export default router;