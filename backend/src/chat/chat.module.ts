import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Chat from './entities/chat.entity';
import RoomUsers from './entities/room-users.entity';
import ChatRoom from './entities/room.entity';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, RoomUsers, ChatRoom])],
  providers: [ChatGateway],
})
export class ChatModule {}
