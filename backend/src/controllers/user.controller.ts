import { error, logger, success } from "../utils"
import { Response } from 'express'
import { HTTP_CODE, MESSAGE } from "../constants"
import { RequestThrow } from "../types"
import User from "../entities/user.entity"

export const me = async (request: RequestThrow<User>, response: Response): Promise<void> => {
    try {
        const user: User = request.currentUser
        delete user.password

        success(response, user, HTTP_CODE.SUCCESS, "Currently logged in user")
    } catch (e) {
        logger.error(e)
        error(response, null, HTTP_CODE.ERROR, MESSAGE.ERROR)
    }
}
