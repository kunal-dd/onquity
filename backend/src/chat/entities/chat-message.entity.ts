import { MESSAGE_TYPE } from 'src/utils/constant';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import ChatUsers from './chat-user.entity';
import Chat from './chat.entity';

@Entity('chat-messages')
export default class ChatMessage {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ name: 'message', type: 'text' })
  message: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: MESSAGE_TYPE,
    default: MESSAGE_TYPE.TEXT,
  })
  type: MESSAGE_TYPE;

  @Column({
    name: 'message_status',
    type: 'varchar',
  })
  message_status: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn({ name: 'chat_id', referencedColumnName: 'id' })
  chat: Chat;

  @ManyToOne(() => ChatUsers, (chat_users) => chat_users.messages)
  @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
  message_sender: ChatUsers;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
