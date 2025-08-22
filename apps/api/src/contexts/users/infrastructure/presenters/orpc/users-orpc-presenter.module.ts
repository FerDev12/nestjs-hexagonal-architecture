import { Module } from '@nestjs/common';
import { UsersOrpcController } from './controllers/users-orpc.controller';

@Module({
  controllers: [UsersOrpcController],
})
export class UsersOrpcPresenterModule {}
