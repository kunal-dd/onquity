import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/auth/guard/jwt.guard';

@WebSocketGateway({
  cors: { origin: ['https://hoppscotch.io', 'http://localhost:5000'] },
})
@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(JwtAuthenticationGuard)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('onquity chat');

  constructor() {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  handleConnection(socket: Socket) {
    this.logger.log('Socket connected');
  }

  handleDisconnect(socket: Socket) {
    socket.disconnect()
    this.logger.log('Socket disconnected');
  }

  private disconnect(socket: Socket) {
    socket.emit('error', new UnauthorizedException());
    socket.disconnect();
  }
}
