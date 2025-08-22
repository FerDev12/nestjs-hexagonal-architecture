import { User } from '../../domain/aggregates/user.aggregate';
import { Repository } from 'src/lib/ports/repository.port';

export abstract class UserRepository extends Repository<User> {
  public abstract findByEmail(email: string): Promise<User | null>;
}
