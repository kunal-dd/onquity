import { Request, Response } from 'express'
import fs from 'fs'

import { HTTP_CODE, MESSAGE } from '../constants'
import UserEntity from '../entities/user.entity'
import { TokenData } from '../interfaces'
import { registerUser, getUserByEmail, getUserByEmailOrMobile } from '../services'
import { RegisterTransfer } from '../transfers'
import { compare, error, generate, hash, logger, success } from '../utils'

export const login = async (request: Request, response: Response): Promise<void> => {
    try {
        const { email, password } = request.body
        if (email && password) {
            const user: UserEntity = await getUserByEmail(email)
            if (user) {
                const userPw: string = user.password
                const compareHash: boolean = await compare(password, userPw)
                if (compareHash) {
                    const { id, full_name, email, role } = user
                    const accessPayload: TokenData = {
                        id,
                        full_name,
                        email,
                        role,
                    }
                    const refreshPayload: TokenData = {
                        id,
                        full_name,
                        email,
                        role,
                    }
                    const secret = await fs.readFileSync(`${__dirname}/../certs/private.pem`)
                    const accessToken = await generate(accessPayload, secret, {
                        expiresIn: '30min',
                        algorithm: 'RS256',
                    })
                    const refreshToken = await generate(refreshPayload, secret, {
                        expiresIn: '1d',
                        algorithm: 'RS256',
                    })
                    //TODO: Save refresh token in db
                    if (accessToken && refreshToken) {
                        success(response, { accessToken, refreshToken }, HTTP_CODE.SUCCESS, role)
                    } else {
                        error(
                            response,
                            null,
                            HTTP_CODE.UNAUTHORIZE,
                            MESSAGE.AUTHENTICATION.MISSING_TOKEN,
                        )
                    }
                } else {
                    error(response, null, HTTP_CODE.NOT_AUTHENTICATION, MESSAGE.PASSWORD_INCORRECT)
                }
            } else {
                error(response, null, HTTP_CODE.ERROR, MESSAGE.INVALID_PARAMS)
            }
        } else {
            error(response, null, HTTP_CODE.ERROR, MESSAGE.INVALID_PARAMS)
        }
    } catch (e) {
        logger.error(e)
        error(response, null, HTTP_CODE.ERROR, MESSAGE.ERROR)
    }
}

export const register = async (request: Request, response: Response): Promise<void> => {
    try {
        const payload: RegisterTransfer = request.body
        if (payload) {
            const { email, full_name, mobile_no, password } = payload
            const user = await getUserByEmailOrMobile(email, mobile_no)
            if (!user || user.length === 0) {
                const hashPw = await hash(password)
                const payload = {
                    email,
                    full_name,
                    mobile_no,
                }
                await registerUser({
                    ...payload,
                    password: hashPw,
                })

                success(response, payload, HTTP_CODE.SUCCESS, MESSAGE.SUCCESS)
            } else {
                error(response, null, HTTP_CODE.ERROR, MESSAGE.AUTHENTICATION.USER_EXIST)
            }
        } else {
            error(response, null, HTTP_CODE.ERROR, MESSAGE.INVALID_PARAMS)
        }
    } catch (e) {
        logger.error(e)
        error(response, null, HTTP_CODE.ERROR, MESSAGE.ERROR)
    }
}
