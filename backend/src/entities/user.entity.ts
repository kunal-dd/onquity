import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { ROLES } from '../constants'
import CoreEntity from './core.entity'
import StartupProfileEntity from './startup-profile.entity'
import UserProfileEntity from './user-profile.entity'
import UserRecommendation from './user-recommendation.entity'

@Entity('users', { orderBy: { id: 'ASC' } })
export default class UserEntity extends CoreEntity {
    @Column({ name: 'email', unique: true, default: null, type: 'varchar' })
    email: string

    @Column({ name: 'full_name', type: 'varchar', default: null })
    full_name: string

    @Column({ name: 'mobile_no', type: 'varchar', default: null })
    mobile_no: string

    @Column({ name: 'password', type: 'varchar' })
    password: string

    @Column({ name: 'role', type: 'enum', enum: ROLES, default: ROLES.USER })
    role: ROLES

    @OneToOne(() => StartupProfileEntity, (startup_profile) => startup_profile.user)
    startup_profile: StartupProfileEntity

    @OneToOne(() => UserProfileEntity, (user_profile) => user_profile.user)
    user_profile: UserProfileEntity

    @OneToMany(() => UserRecommendation, (recommendation) => recommendation.user)
    recommendations: UserRecommendation[]

    constructor(full_name: string, password: string, email: string, mobile_no: string) {
        super()
        this.email = email
        this.mobile_no = mobile_no
        this.full_name = full_name
        this.password = password
        this.role = ROLES.USER
    }
}
