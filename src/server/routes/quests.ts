import type { Router } from 'express-serve-static-core';
import QuestsController from '../controllers/QuestsController';

const controller = new QuestsController;

export const useQuestsRoutes = (router: Router) => {
    router.get('/quests', controller.index);
    router.get('/quests/search', controller.search);
};