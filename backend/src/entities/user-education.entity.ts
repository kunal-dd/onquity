import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import CoreEntity from './core.entity'
import UserProfile from './user-profile.entity'

@Entity('user-education')
export default class UserEducation extends CoreEntity {
    @Column({ name: 'school', default: null, type: 'varchar' })
    school: string

    @Column({ name: 'degree', default: null, type: 'varchar' })
    degree: string

    @Column({ name: 'field_of_study', default: null, type: 'varchar' })
    field_of_study: string

    @Column({ name: 'from', default: null, type: 'date' })
    from: Date

    @Column({ name: 'to', default: null, type: 'date' })
    to: Date

    @Column({ name: 'description', default: null, type: 'text' })
    description: string

    @ManyToOne(() => UserProfile, (user_profile) => user_profile.recommendations)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    user: UserProfile
}
