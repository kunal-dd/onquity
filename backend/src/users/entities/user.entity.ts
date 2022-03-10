import { Exclude } from 'class-transformer';
import { ROLES } from 'src/utils/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import StartupProfile from './startup-profile.entity';
import UserProfile from './user-profile.entity';

@Entity('users', { orderBy: { id: 'ASC' } })
export default class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'profile_uid', type: 'varchar', default: null })
  profile_uid: string;

  @Column({ name: 'full_name', type: 'varchar', default: null })
  full_name: string;

  @Column({ name: 'email', unique: true, default: null, type: 'varchar' })
  email: string;

  @Column({ name: 'hashed_refresh_token', nullable: true, select: false })
  @Exclude()
  public hashedRefreshToken?: string;

  @Column({ name: 'mobile_no', type: 'varchar', default: null })
  mobile_no: string;

  @Column({ name: 'password', type: 'varchar', select: false })
  password: string;

  @Column({ name: 'role', type: 'enum', enum: ROLES, default: null })
  role: ROLES;

  @Column({ name: 'reset_password_otp', nullable: true, select: false })
  @Exclude()
  reset_password_otp?: string;

  @OneToOne(() => StartupProfile, (startup_profile) => startup_profile.user)
  startup_profile: StartupProfile;

  @OneToOne(() => UserProfile, (user_profile) => user_profile.user)
  user_profile: UserProfile;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}
