import { Router } from 'express'
import { me } from '../controllers'
import { throwAsNext, authenticate } from '../middlewares'

const path = '/user'
const router: Router = Router()

router.post('/me', authenticate, throwAsNext(me))

export default {
    path,
    router,
}
