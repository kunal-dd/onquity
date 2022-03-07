import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entity';

@Entity('startup-profile')
export default class StartupProfile {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'startup_name', type: 'varchar', default: null })
  startup_name: string;

  @Column({ name: 'startup_tagline', type: 'varchar', default: null })
  startup_tagline: string;

  @Column({ name: 'startup_logo', type: 'text', default: null })
  startup_logo: string;

  @Column({ name: 'incorporation_date', type: 'date', default: null })
  incorporation_date: Date;

  @Column({ name: 'website', type: 'varchar', default: null })
  website: string;

  @Column({ name: 'description', type: 'varchar', default: null })
  description: string;

  @Column({ name: 'industry', type: 'varchar', default: null })
  industry: string;

  @Column({ name: 'company_size', type: 'varchar', default: null })
  company_size: string;

  @Column({ name: 'company_type', type: 'varchar', default: null })
  company_type: string;

  @Column({ name: 'location', type: 'varchar', default: null })
  location: string;

  @OneToOne(() => User, (user) => user.startup_profile)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
