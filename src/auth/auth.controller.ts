import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { UserSerializer } from './serializers/user.serializer';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserSerializer })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(@Req() req: Request, @Body() _body: LoginDto) {
    return new UserSerializer(req.user as UserDocument);
  }

  @Post('signup')
  @ApiCreatedResponse({ type: UserSerializer })
  async signUp(@Body() body: SignUpDto): Promise<UserSerializer> {
    const existingUser = await this.userService.getByEmail(body.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return new UserSerializer(await this.userService.createUser(body));
  }
}
