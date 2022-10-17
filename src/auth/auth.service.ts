import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getByEmail(username);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async login(user: UserDocument) {
    try {
      return await this.jwtService.signAsync({ email: user.email });
    } catch (err) {
      this.logger.error(`Error generating jwt for: ${user.email}`, err.stack);

      throw new InternalServerErrorException();
    }
  }
}
