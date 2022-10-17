import { ApiProperty } from '@nestjs/swagger';
import { UserSerializer } from './user.serializer';

export class LoginSerializer {
  @ApiProperty()
  token: string;

  @ApiProperty()
  user: UserSerializer;

  constructor(token: string, user: UserSerializer) {
    this.token = token;
    this.user = user;
  }
}
