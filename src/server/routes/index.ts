import express, { type Response } from 'express';
import { useAmmoRoutes } from './ammo';
import { useArmorRoutes } from './armor';
import { useMedicalRoutes } from './medical';
import { useProvisionsRoutes } from './provisions';
import { useImportRoutes } from './import';

/**
 * setup router
 */
const router = express.Router();

/**
 * Register routes
 */
useAmmoRoutes(router);
useArmorRoutes(router);
useMedicalRoutes(router);
useProvisionsRoutes(router);
useImportRoutes(router);

/**
 * catch all route
 */
router.get(/.*/, (_, res: Response) => res.sendStatus(200));


export default router;