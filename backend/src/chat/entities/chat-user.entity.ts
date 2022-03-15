import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import ChatMessage from './chat-message.entity';
import Chat from './chat.entity';

@Entity('chat-users')
export default class ChatUsers {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => Chat, (chat) => chat.users)
  @JoinColumn({name: 'chat_id', referencedColumnName: 'id'})
  chat: Chat;

  @OneToMany(() => ChatMessage, (chat_messages) => chat_messages.message_sender)
  messages: ChatMessage[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
