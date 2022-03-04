import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import CoreEntity from './core.entity'
import UserEntity from './user.entity'

export enum STARTUP_EXPERIENCE {
    YES = 'yes',
    NO = 'no',
}

@Entity('user-profile')
export default class UserProfileEntity extends CoreEntity {
    @Column({ name: 'profile_image', type: 'text', default: null })
    profile_image: string

    @Column({ name: 'headline', type: 'text', default: null })
    headline: string

    @Column({ name: 'about', type: 'text', default: null })
    about: string

    @Column({ name: 'startup_experience', type: 'enum', enum: STARTUP_EXPERIENCE, default: STARTUP_EXPERIENCE.NO })
    startup_experience: STARTUP_EXPERIENCE
 
    @Column({ name: 'location', type: 'varchar', default: null })
    location: string

    @OneToOne(() => UserEntity, (user) => user.user_profile)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: UserEntity
}
