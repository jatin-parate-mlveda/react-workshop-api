import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/auth/dtos/signup.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getByEmail(username: string) {
    try {
      return await this.userModel.findOne({ email: username }).exec();
    } catch (err) {
      this.logger.error(
        `Error in fetching user details for ${username}`,
        err.stack,
      );
      throw new InternalServerErrorException('Error in fetching user details');
    }
  }

  async createUser(body: SignUpDto) {
    try {
      return (await this.userModel.create(body)) as any as UserDocument;
    } catch (err) {
      this.logger.error(`Error in creating user: ${body.email}`, err.stack);
      throw new InternalServerErrorException('Error in creatingUser');
    }
  }
}
