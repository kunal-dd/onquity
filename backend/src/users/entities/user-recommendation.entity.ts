import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserProfile from './user-profile.entity';

@Entity('user-recommendation')
export default class UserRecommendation {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'recommended_by', default: null, type: 'int' })
  recommended_by: number;

  @Column({ name: 'recommended_to', default: null, type: 'int' })
  recommended_to: number;

  @Column({ name: 'relation', default: null, type: 'varchar' })
  relation: string;

  @Column({ name: 'recommendation', default: null, type: 'text' })
  recommendation: string;

  @ManyToOne(() => UserProfile, (user_profile) => user_profile.recommendations)
  @JoinColumn({ name: 'profile_id', referencedColumnName: 'id' })
  user: UserProfile;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
