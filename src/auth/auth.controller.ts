import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { LoginSerializer } from './serializers/login.serializer';
import { UserSerializer } from './serializers/user.serializer';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: LoginSerializer })
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Req() req: Request) {
    return new LoginSerializer(
      await this.authService.login(req.user as UserDocument),
      new UserSerializer(req.user as UserDocument),
    );
  }

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiCreatedResponse({ type: UserSerializer })
  async signUp(@Body() body: SignUpDto): Promise<UserSerializer> {
    const existingUser = await this.userService.getByEmail(body.email);

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return new UserSerializer(await this.userService.createUser(body));
  }
}
