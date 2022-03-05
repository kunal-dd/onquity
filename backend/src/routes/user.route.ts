import { Router } from 'express'
import { API_PREFIX } from '../constants'
import { logout, me } from '../controllers'
import { throwAsNext, authenticate } from '../middlewares'

const path = `${API_PREFIX}/user`

const router: Router = Router()

router.post('/me', authenticate, throwAsNext(me))
router.post('/logout', authenticate, throwAsNext(logout))

export default {
    path,
    router,
}
