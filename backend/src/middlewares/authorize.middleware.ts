import { NextFunction } from 'express'
import { MESSAGE } from '../constants'
import { TokenData } from '../interfaces'
import { RequestThrow } from '../types'

export const isAdmin = (request: RequestThrow<TokenData>, _: unknown, next: NextFunction): void => {
    const tokenDecode: TokenData = request.currentUser
    if (tokenDecode?.role === 'admin') {
        next()
    } else {
        next(MESSAGE.AUTHENTICATION.UNAUTHORIZE)
    }
}
