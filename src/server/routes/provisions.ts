import type { Router } from 'express-serve-static-core'
import ProvisionsController from '../controllers/ProvisionsController'

const controller = new ProvisionsController

export const useProvisionsRoutes = (router: Router) => {
    router.get('/provisions', controller.index)
    router.get('/provisions/search', controller.search)
}