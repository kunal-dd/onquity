import { EmploymentType } from 'src/utils/constant';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserProfile from './user-profile.entity';

@Entity('user-work-experience')
export default class UserWorkExperience {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'title', default: null, type: 'varchar' })
  title: string;

  @Column({
    name: 'employment_type',
    default: null,
    type: 'enum',
    enum: EmploymentType,
  })
  employment_type: EmploymentType;

  @Column({ name: 'company_name', default: null, type: 'varchar' })
  company_name: string;

  @Column({ name: 'headline', default: null, type: 'varchar' })
  headline: string;

  @Column({ name: 'from', default: null, type: 'date' })
  from: Date;

  @Column({ name: 'to', default: null, type: 'date' })
  to: Date;

  @Column({ name: 'industry', default: null, type: 'varchar' })
  industry: string;

  @Column({ name: 'description', default: null, type: 'text' })
  description: string;

  @ManyToOne(() => UserProfile, (user_profile) => user_profile.recommendations)
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  user: UserProfile;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
