import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import CoreEntity from './core.entity'
import UserEntity from './user.entity'

@Entity('user-recommendation')
export default class UserRecommendation extends CoreEntity {
    @Column({ name: 'recommended_by', default: null, type: 'int' })
    recommended_by: number

    @Column({ name: 'recommended_to', default: null, type: 'int' })
    recommended_to: number

    @Column({ name: 'relation', default: null, type: 'varchar' })
    relation: string

    @Column({ name: 'recommendation', default: null, type: 'text' })
    recommendation: string

    @ManyToOne(() => UserEntity, (user) => user.recommendations)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity
}
