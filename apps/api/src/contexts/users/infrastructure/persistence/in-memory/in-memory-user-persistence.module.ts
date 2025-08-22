import { Module } from '@nestjs/common';
import { UserRepository } from 'src/contexts/users/application/ports/user.repository';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';

@Module({
  providers: [
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class InMemoryUserPersistenceModule {}
