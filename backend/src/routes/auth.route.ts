import { Router } from 'express'
import { API_PREFIX } from '../constants'
import { login, register } from '../controllers'
import { throwAsNext } from '../middlewares'

const path = `${API_PREFIX}/auth`
const router: Router = Router()

router.post('/login', throwAsNext(login))

router.post('/register', throwAsNext(register))

export default {
    path,
    router,
}
