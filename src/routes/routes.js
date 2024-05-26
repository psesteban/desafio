import { Router } from 'express'
import { getHtml, getCanciones, postCanciones, editCancion, deleteCancion } from '../controllers/cancionesControllers.js'

const router = Router()

router.get('/', getHtml)
router.route('/canciones').get(getCanciones).post(postCanciones)
router.route('/canciones/:id').put(editCancion).delete(deleteCancion)
export default router
