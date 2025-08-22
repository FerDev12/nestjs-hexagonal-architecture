import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserHttpResponse {
  constructor(
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date | null,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date | null;
}
