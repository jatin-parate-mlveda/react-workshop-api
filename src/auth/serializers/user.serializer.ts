import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import IUser from 'src/user/interfaces/user.interface';
import { UserDocument } from 'src/user/schemas/user.schema';

export class UserSerializer implements IUser {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  age: number;

  @Exclude()
  password: string;

  constructor(userDocument: UserDocument) {
    Object.assign(this, {
      ...userDocument.toJSON(),
      _id: userDocument._id.toString(),
    });
  }
}
