import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import ChatRoom from './room.entity';

@Entity('room-users')
export default class RoomUsers {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => ChatRoom, (chat_room) => chat_room.room_users)
  room: ChatRoom;
}
