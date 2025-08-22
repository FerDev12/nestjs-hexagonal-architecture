import { Query } from '@nestjs/cqrs';
import { User } from '../../domain/aggregates/user.aggregate';

export class GetUserByEmailQuery extends Query<User> {
  constructor(public readonly email: string) {
    super();
  }
}
