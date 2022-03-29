import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entity';

@Entity('user-sessions')
export default class UserSessions {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'session_started', type: 'timestamp', nullable: true })
  session_started: Date;

  @Column({ name: 'session_ended', type: 'timestamp', nullable: true })
  session_ended: Date;

  @ManyToOne(() => User, (user) => user.user_sessions)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
