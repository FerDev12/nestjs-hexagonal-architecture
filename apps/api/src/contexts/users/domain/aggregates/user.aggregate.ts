import { AggregateRoot, CreateEntityProps } from 'src/lib/domain';
import {
  ArgumentNotProvidedException,
  InvalidArgumentException,
} from 'src/lib/exceptions';
import { Email } from '../value-objects/email.vo';

interface UserProps {
  name: string;
  email: Email;
}

export class User extends AggregateRoot<UserProps> {
  constructor(props: CreateEntityProps<UserProps>) {
    super(props);
    this.validate();
  }

  get email(): Email {
    return this._props.email;
  }

  get name(): string {
    return this._props.name;
  }

  validate() {
    if (!this.email) {
      throw new ArgumentNotProvidedException('Email is required');
    } else if (!this.email.value.includes('@')) {
      throw new InvalidArgumentException('Invalid email');
    }
  }
}
