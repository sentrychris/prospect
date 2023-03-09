import express, { type Response } from 'express';
import { useDeviceRoutes } from './devices';
import { useImportRoutes } from './import';
import swaggerUi from 'swagger-ui-express';
import * as apiSchema from '../docs/swagger.json';

/**
 * setup router
 */
const router = express.Router();

/**
 * Application routes
 */
useDeviceRoutes(router);
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