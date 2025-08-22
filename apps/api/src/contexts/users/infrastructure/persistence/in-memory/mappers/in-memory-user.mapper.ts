import { User } from 'src/contexts/users/domain/aggregates/user.aggregate';
import { InMemoryUser } from '../entities/in-memory-user.entity';
import { Email } from 'src/contexts/users/domain/value-objects/email.vo';

export class InMemoryUserMapper {
  static toDomain(entity: InMemoryUser): User {
    const email = new Email(entity.email);
    return new User({
      ...entity,
      email: email,
    });
  }

  static toPersistence(domain: User): InMemoryUser {
    return new InMemoryUser(
      domain.id,
      domain.name,
      domain.email.value,
      domain.createdAt,
      domain.updatedAt,
    );
  }
}
