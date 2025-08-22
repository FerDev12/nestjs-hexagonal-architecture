import { Module } from '@nestjs/common';
import { UsersHttpController } from './controllers/users-http.controller';

@Module({
  controllers: [UsersHttpController],
})
export class UsersHttpPresenterModule {}
