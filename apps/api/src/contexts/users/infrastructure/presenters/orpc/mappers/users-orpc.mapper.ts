import { User } from 'src/contexts/users/domain/aggregates/user.aggregate';

export class UsersOrpcMapper {
  static toResponse(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email.value,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt?.toISOString() ?? null,
    };
  }
}
