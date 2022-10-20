import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import IUser from '../interfaces/user.interface';

export class UpdateUserDto implements Omit<IUser, 'email'> {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Min(10)
  age: number;
}
