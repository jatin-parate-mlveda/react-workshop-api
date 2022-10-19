import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movies.shema';

@Injectable()
export class MoviesService {
  logger = new Logger(MoviesService.name);
  constructor(
    @InjectModel(Movie.name) private movieModal: Model<MovieDocument>,
  ) {}

  async getAll() {
    try {
      return await this.movieModal.find().limit(10).exec();
    } catch (err) {
      this.logger.error(`Error while getting movies`, err.stack);
      throw new InternalServerErrorException('Unable to fetch movies!');
    }
  }
}
