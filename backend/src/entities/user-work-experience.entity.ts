import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { EmploymentType } from '../constants'
import CoreEntity from './core.entity'
import UserProfile from './user-profile.entity'

@Entity('user-work-experience')
export default class UserWorkExperience extends CoreEntity {
    @Column({ name: 'title', default: null, type: 'varchar' })
    title: string

    @Column({ name: 'employment_type', default: null, type: 'enum', enum: EmploymentType })
    employment_type: EmploymentType

    @Column({ name: 'company_name', default: null, type: 'varchar' })
    company_name: string

    @Column({ name: 'headline', default: null, type: 'varchar' })
    headline: string

    @Column({ name: 'from', default: null, type: 'date' })
    from: Date

    @Column({ name: 'to', default: null, type: 'date' })
    to: Date

    @Column({ name: 'industry', default: null, type: 'varchar' })
    industry: string

    @Column({ name: 'description', default: null, type: 'text' })
    description: string

    @ManyToOne(() => UserProfile, (user_profile) => user_profile.recommendations)
    @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
    user: UserProfile
}
