import express, { type Response } from 'express';
import { useAmmoRoutes } from './ammo';
import { useMedicalRoutes } from './medical';
import { useProvisionsRoutes } from './provisions';
import { useImportRoutes } from './import';

/**
 * setup router
 */
const router = express.Router()

/**
 * Register routes
 */
useAmmoRoutes(router)
useMedicalRoutes(router)
useProvisionsRoutes(router)
useImportRoutes(router)

/**
 * catch all route
 */
router.get(/.*/, (_, res: Response) => res.sendStatus(200))


export default router