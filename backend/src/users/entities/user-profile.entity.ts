import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entity';
import UserRecommendation from './user-recommendation.entity';
import UserWorkExperience from './user-work-experience.entity';
import UserEducation from './user-education.entity';
import { INDIVIDUAL_USER_TYPE, TRUE_FALSE_ENUM } from 'src/utils/constant';

@Entity('user-profile')
export default class UserProfile {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'profile_image', type: 'text', default: null })
  profile_image: string;

  @Column({
    name: 'user_type',
    type: 'enum',
    enum: INDIVIDUAL_USER_TYPE,
    default: null,
  })
  user_type: INDIVIDUAL_USER_TYPE;

  @Column({ name: 'current_position', type: 'varchar', default: null })
  current_position: string;

  @Column({ name: 'industry', type: 'varchar', default: null })
  industry: string;

  @Column({ name: 'location', type: 'varchar', default: null })
  location: string;

  @Column({ name: 'headline', type: 'text', default: null })
  headline: string;

  @Column({
    name: 'is_student',
    type: 'enum',
    enum: TRUE_FALSE_ENUM,
    default: TRUE_FALSE_ENUM.NO,
  })
  is_student: TRUE_FALSE_ENUM;

  @Column({
    name: 'is_age_verified',
    type: 'enum',
    enum: TRUE_FALSE_ENUM,
    default: TRUE_FALSE_ENUM.YES,
  })
  is_age_verified: TRUE_FALSE_ENUM;

  @Column({ name: 'about', type: 'text', default: null })
  about: string;

  @Column({ name: 'area_of_expertise', type: 'simple-array', default: null })
  area_of_expertise: string[];

  @Column({ name: 'total_work_experience', type: 'varchar', default: null })
  total_work_experience: string;

  @OneToMany(() => UserRecommendation, (recommendation) => recommendation.user)
  recommendations: UserRecommendation[];

  @OneToMany(() => UserWorkExperience, (work_exp) => work_exp.user)
  work_experience: UserWorkExperience[];

  @OneToMany(() => UserEducation, (education) => education.user)
  education: UserEducation[];

  @OneToOne(() => User, (user) => user.user_profile)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
