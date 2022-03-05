import { getCustomRepository } from 'typeorm'
import { RegisterTransfer } from '../transfers/register.transfer'
import { UserRepository } from '../repositories/user.repository'
import User from '../entities/user.entity'

export const getUserByEmail = async (email: string): Promise<User> => {
    const userRepo = getCustomRepository(UserRepository)
    try {
        return await userRepo.findOne({ email })
    } catch (error) {
        console.error(error)
    }
}

export const getUserByEmailOrMobile = async (
    email: string,
    mobile: string,
): Promise<User[]> => {
    const userRepo = getCustomRepository(UserRepository)
    try {
        const user = await userRepo.find({
            where: [{ email: email }, { mobile_no: mobile }],
        })
        return user
    } catch (error) {
        console.error('111', error)
    }
}

export const getUserByUserName = async (full_name: string): Promise<User> => {
    const userRepo = getCustomRepository(UserRepository)

    try {
        return await userRepo.findOne({ full_name })
    } catch (error) {
        console.error('>>>', error)
    }
}

export const registerUser = async (payload: RegisterTransfer): Promise<User> => {
    const userRepo = getCustomRepository(UserRepository)

    const { email, mobile_no, full_name, password } = payload

    try {
        return await userRepo.save({
            email,
            full_name,
            mobile_no,
            password,
        })
    } catch (error) {
        console.error(error)
    }
}
