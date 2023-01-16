import express, { type Response } from 'express';
import { useAmmoRoutes } from './ammo';
import { useArmorRoutes } from './armor';
import { useBackpacksRoutes } from './backpacks';
import { useMedicalRoutes } from './medical';
import { useProvisionsRoutes } from './provisions';
import { useImportRoutes } from './import';
import swaggerUi from 'swagger-ui-express';
import * as apiSchema from '../api/swagger.json';

/**
 * setup router
 */
const router = express.Router();

/**
 * Application routes
 */
useAmmoRoutes(router);
useArmorRoutes(router);
useBackpacksRoutes(router);
useMedicalRoutes(router);
useProvisionsRoutes(router);
useImportRoutes(router);

/**
 * Documentation routes
 */
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(apiSchema));

/**
 * catch all route
 */
router.get(/.*/, (_, res: Response) => res.sendStatus(200));


export default router;