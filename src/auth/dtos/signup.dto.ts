import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsEmail, Min } from 'class-validator';
import IUser from '../../user/interfaces/user.interface';

export class SignUpDto implements IUser {
  @ApiProperty()
  @IsNumber()
  @Min(10)
  age: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
