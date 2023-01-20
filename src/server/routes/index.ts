import express, { type Response } from 'express';
import { useAmmoRoutes } from './ammo';
import { useArmorRoutes } from './armor';
import { useBackpacksRoutes } from './backpacks';
import { useMapsRoutes } from './maps';
import { useMedicalRoutes } from './medical';
import { useProvisionsRoutes } from './provisions';
import { useQuestsRoutes } from './quests';
import { useImportRoutes } from './import';
import swaggerUi from 'swagger-ui-express';
import * as apiSchema from '../../../docs/swagger.json';

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
useMapsRoutes(router);
useMedicalRoutes(router);
useProvisionsRoutes(router);
useQuestsRoutes(router);
useImportRoutes(router);

/**
 * Documentation routes
 */
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(apiSchema));

router.get('/Quests', function(error, res) {
    const options = {root: __dirname};
    res.sendFile('table.html', options, function(error) {
        if (error) {
            res.writeHead(500);
            res.end();
        }
    });
});

/**
 * catch all route
 */
router.get(/.*/, (_, res: Response) => res.sendStatus(200));


export default router;