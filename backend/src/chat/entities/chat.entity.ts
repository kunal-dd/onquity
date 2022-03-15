import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ChatMessage from './chat-message.entity';
import ChatUsers from './chat-user.entity';

@Entity('chat')
export default class Chat {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @OneToMany(() => ChatMessage, (chat_messages) => chat_messages.chat)
  messages: ChatMessage[];

  @OneToMany(() => ChatUsers, (chat_users) => chat_users.chat)
  users: ChatUsers[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
