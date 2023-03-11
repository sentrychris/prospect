import express, { type Response } from 'express';
import { useDeviceRoutes } from './devices';
import { useUserRoutes } from './users';
// import swaggerUi from 'swagger-ui-express';
// import * as apiSchema from '../docs/swagger.json';


/**
 * setup router
 */
const router = express.Router();

/**
 * Application routes
 */
useDeviceRoutes(router);
useUserRoutes(router);

// /**
//  * Documentation routes
//  */
// router.use('/docs', swaggerUi.serve);
// router.get('/docs', swaggerUi.setup(apiSchema));

/**
 * catch all route
 */
router.get(/.*/, (_, res: Response) => res.sendStatus(200));


export default router;