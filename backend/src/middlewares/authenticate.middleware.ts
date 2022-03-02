import { NextFunction, Response } from 'express'
import fs from 'fs'

import { HTTP_CODE, MESSAGE } from '../constants'
import UserEntity from '../entities/user.entity'
import { TokenData } from '../interfaces'
import { error, logger, verify } from '../utils'
import { RequestThrow } from '../types'
import { getUserByEmail } from '../services'

export const authenticate = async (
    request: RequestThrow<TokenData>,
    response: Response,
    next: NextFunction,
): Promise<void> => {
    const { authorization } = request.headers
    if (authorization && authorization.match(/^Bearer /g)) {
        const token: string = authorization.split(' ')[1]
        if (token) {
            try {
                const publicSecret = await fs.readFileSync(`${__dirname}/../certs/public.pem`)
                const tokenDecode: TokenData = await verify(token, publicSecret)
                const { email } = tokenDecode
                const user: UserEntity = await getUserByEmail(email)
                if (user) {
                    request.currentUser = user
                    next()
                } else {
                    return error(
                        response,
                        null,
                        HTTP_CODE.ERROR,
                        MESSAGE.AUTHENTICATION.INVALID_TOKEN,
                    )
                }
            } catch (e) {
                logger.error(e)
                return error(response, null, HTTP_CODE.ERROR, MESSAGE.AUTHENTICATION.INVALID_TOKEN)
            }
        } else {
            return error(response, null, HTTP_CODE.ERROR, MESSAGE.AUTHENTICATION.INVALID_TOKEN)
        }
    } else {
        return error(
            response,
            null,
            HTTP_CODE.NOT_AUTHENTICATION,
            MESSAGE.AUTHENTICATION.MISSING_TOKEN,
        )
    }
}
