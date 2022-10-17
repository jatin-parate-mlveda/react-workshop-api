import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  logger = new Logger(AuthService.name);

  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.getByEmail(username);

    if (user && user.password === password) {
      return user;
    }

    return null;
  }
}
