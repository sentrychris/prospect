import type { Router } from 'express-serve-static-core'
import MedicalController from '../controllers/MedicalController'

const controller = new MedicalController

export const useMedicalRoutes = (router: Router) => {
    router.get('/medical', controller.index)
    router.get('/medical/search', controller.search)
}