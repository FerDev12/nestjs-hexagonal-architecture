import { ValueObject } from 'src/lib/domain';
import {
  ArgumentNotProvidedException,
  InvalidArgumentException,
} from 'src/lib/exceptions';

export class Email extends ValueObject<string> {
  constructor(value: string) {
    super(value);
  }

  validate() {
    if (!this.value) {
      throw new ArgumentNotProvidedException('Email is required');
    } else if (!this.value.includes('@')) {
      throw new InvalidArgumentException('Invalid email');
    }
  }
}
