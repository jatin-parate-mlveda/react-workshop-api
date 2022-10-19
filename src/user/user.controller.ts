import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserSerializer } from 'src/auth/serializers/user.serializer';
import { UserDocument } from './schemas/user.schema';

@ApiTags('User')
@Controller('user')
export class UserController {
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('currentuser')
  @UseInterceptors(ClassSerializerInterceptor)
  getCurrentUser(@Req() req: Request) {
    return new UserSerializer(req.user as UserDocument);
  }
}
