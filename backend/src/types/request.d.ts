import { Request } from 'express'

export interface RequestThrow<T> extends Request {
    currentUser?: T
}
