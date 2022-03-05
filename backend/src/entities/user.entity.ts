import { Column, Entity, OneToOne } from 'typeorm'
import { ROLES } from '../constants'
import CoreEntity from './core.entity'
import StartupProfile from './startup-profile.entity'
import UserProfile from './user-profile.entity'

@Entity('users', { orderBy: { id: 'ASC' } })
export default class User extends CoreEntity {
    @Column({ name: 'email', unique: true, default: null, type: 'varchar' })
    email: string

    @Column({ name: 'full_name', type: 'varchar', default: null })
    full_name: string

    @Column({ name: 'mobile_no', type: 'varchar', default: null })
    mobile_no: string

    @Column({ name: 'password', type: 'varchar' })
    password: string

    @Column({ name: 'role', type: 'enum', enum: ROLES, default: null })
    role: ROLES

    @OneToOne(() => StartupProfile, (startup_profile) => startup_profile.user)
    startup_profile: StartupProfile

    @OneToOne(() => UserProfile, (user_profile) => user_profile.user)
    user_profile: UserProfile

    constructor(full_name: string, password: string, email: string, mobile_no: string, role: ROLES) {
        super()
        this.email = email
        this.mobile_no = mobile_no
        this.full_name = full_name
        this.password = password
        this.role = role
    }
}
