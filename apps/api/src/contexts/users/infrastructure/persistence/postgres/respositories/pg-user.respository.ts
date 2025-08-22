import { User } from 'src/contexts/users/domain/aggregates/user.aggregate';
import { PgUser } from '../entities/pg-user.entity';
import { PgUserMapper } from '../mappers/pg-user.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeOrmRepository } from 'typeorm';
import { UserRepository } from 'src/contexts/users/application/ports/user.repository';

export class PgUserRepository extends UserRepository {
  constructor(
    @InjectRepository(PgUser)
    private readonly pgUserRepository: TypeOrmRepository<PgUser>,
  ) {
    super();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.pgUserRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    return PgUserMapper.toDomain(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.pgUserRepository.find();
    return users.map((user) => PgUserMapper.toDomain(user));
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.pgUserRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return PgUserMapper.toDomain(user);
  }

  async save(user: User): Promise<{ id: string }> {
    const pgUser = PgUserMapper.toPersistence(user);
    await this.pgUserRepository.save(pgUser);
    return { id: pgUser.id };
  }

  async delete(user: User): Promise<void> {
    await this.pgUserRepository.delete(user.id);
  }
}
