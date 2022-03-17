import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  INDIVIDUAL_USER_TYPE,
  WORK_COMMITMENT_TYPE,
  WORKPLACE_TYPE,
} from 'src/utils/constant';
import User from 'src/users/entities/user.entity';

@Entity('post')
export default class Post {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'post_title', type: 'varchar', nullable: false })
  post_title: string;

  @Column({ name: 'categories', type: 'simple-array', default: null })
  categories: INDIVIDUAL_USER_TYPE[];

  @Column({
    name: 'work_commitment',
    type: 'enum',
    enum: WORK_COMMITMENT_TYPE,
    default: null,
  })
  work_commitment: WORK_COMMITMENT_TYPE;

  @Column({
    name: 'workplace',
    type: 'enum',
    enum: WORKPLACE_TYPE,
    default: null,
  })
  workplace: WORKPLACE_TYPE;

  @Column({ name: 'description', type: 'text', default: null })
  description: string;

  @Column({ name: 'equity', type: 'varchar', default: null })
  equity: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  User: User;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', select: false })
  updatedAt: Date;
}
