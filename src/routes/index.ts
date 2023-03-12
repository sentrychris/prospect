import express, { type Response } from 'express';
import { useUserRoutes } from './users';
import { useAuthRoutes } from './auth';
import { useProfileRoutes } from './profiles';
import { useDeviceRoutes } from './devices'; 
// import swaggerUi from 'swagger-ui-express';
// import * as apiSchema from '../docs/swagger.json';


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

// /**
//  * Documentation routes
//  */
// router.use('/docs', swaggerUi.serve);
// router.get('/docs', swaggerUi.setup(apiSchema));


router.get('/health', (_, res: Response) => res.sendStatus(200));


export default router;