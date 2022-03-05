import { Column, Entity } from 'typeorm'
import CoreEntity from './core.entity'

@Entity('refresh_token', { orderBy: { id: 'ASC' } })
export default class RefreshToken extends CoreEntity {
    @Column({ name: 'user_id', default: null, type: 'int' })
    user_id: string

    @Column({ name: 'refresh_token', type: 'text', default: null })
    refresh_token: string
}
