import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserSerializer } from 'src/auth/serializers/user.serializer';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDocument } from './schemas/user.schema';
import { UserService } from './user.service';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('currentuser')
  getCurrentUser(@Req() req: Request) {
    return new UserSerializer(req.user as UserDocument);
  }

  @Put()
  async updateCurrentUser(@Req() req: Request, @Body() body: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(
      req.user as UserDocument,
      body,
    );

    return new UserSerializer(updatedUser);
  }
}
