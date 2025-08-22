import { Injectable } from '@nestjs/common';
import { InMemoryUser } from '../entities/in-memory-user.entity';
import { InMemoryUserMapper } from '../mappers/in-memory-user.mapper';
import { User } from 'src/contexts/users/domain/aggregates/user.aggregate';
import { UserRepository } from 'src/contexts/users/application/ports/user.repository';

@Injectable()
export class InMemoryUserRepository extends UserRepository {
  private users: InMemoryUser[] = [];

  async findAll(): Promise<User[]> {
    return new Promise((res) => {
      res(this.users.map((user) => InMemoryUserMapper.toDomain(user)));
    });
  }

  async findById(id: string): Promise<User | null> {
    return new Promise((res) => {
      const user = this.users.find((user) => user.id === id);
      if (!user) {
        res(null);
      }
      res(InMemoryUserMapper.toDomain(user as InMemoryUser));
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return new Promise((res) => {
      const user = this.users.find((user) => user.email === email);
      if (!user) {
        res(null);
      }
      res(InMemoryUserMapper.toDomain(user as InMemoryUser));
    });
  }

  async save(user: User): Promise<{ id: string }> {
    return new Promise((res) => {
      this.users.push(InMemoryUserMapper.toPersistence(user));
      res({ id: user.id });
    });
  }

  async delete(user: User): Promise<void> {
    return new Promise((res) => {
      this.users = this.users.filter(
        (u) => u.id !== InMemoryUserMapper.toPersistence(user).id,
      );
      res();
    });
  }
}
