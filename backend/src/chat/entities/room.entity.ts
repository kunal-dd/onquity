import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Chat from './chat.entity';
import RoomUsers from './room-users.entity';

@Entity('chat-rooms')
export default class ChatRoom {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @OneToMany(() => Chat, (message) => message.room)
  messages: Chat[];

  @OneToMany(() => RoomUsers, (room_users) => room_users.room)
  room_users: RoomUsers[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
