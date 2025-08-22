import { Module } from '@nestjs/common';
import { UserRepository } from 'src/contexts/users/application/ports/user.repository';
import { PgUserRepository } from './respositories/pg-user.respository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PgUser } from './entities/pg-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PgUser])],
  providers: [
    {
      provide: UserRepository,
      useClass: PgUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class PostgresUserPersistenceModule {}
