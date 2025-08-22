import { User } from 'src/contexts/users/domain/aggregates/user.aggregate';
import { PgUser } from '../entities/pg-user.entity';
import { Email } from 'src/contexts/users/domain/value-objects/email.vo';

export class PgUserMapper {
  static toDomain(entity: PgUser): User {
    return new User({
      id: entity.id,
      name: entity.name,
      email: new Email(entity.email),
    });
  }

  static toPersistence(domain: User): PgUser {
    const user = new PgUser();
    user.id = domain.id;
    user.name = domain.name;
    user.email = domain.email.value;
    user.createdAt = domain.createdAt;
    user.updatedAt = domain.updatedAt;
    return user;
  }
}
