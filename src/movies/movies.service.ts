import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetMoviesQueryDto } from './dtos/get-movies-query.dto';
import { Movie, MovieDocument } from './schemas/movies.shema';

@Injectable()
export class MoviesService {
  logger = new Logger(MoviesService.name);
  constructor(
    @InjectModel(Movie.name) private movieModal: Model<MovieDocument>,
  ) {}

  async getAll(queryDto: GetMoviesQueryDto) {
    try {
      let filter: any | undefined;

      if (queryDto.searchText) {
        const regexp = new RegExp(queryDto.searchText, 'i');
        filter = {
          $or: [
            {
              title: regexp,
            },
            {
              plot: regexp,
            },
            {
              writers: { $in: regexp },
            },
            {
              cast: { $in: regexp },
            },
          ],
        };
      }

      return await this.movieModal
        .find(filter)
        .sort({ [queryDto.sort]: queryDto.sortOrder === 'asc' ? 1 : -1 })
        .limit(queryDto.limit || 10)
        .skip(queryDto.skip || 0)
        .exec();
    } catch (err) {
      this.logger.error(`Error while getting movies`, err.stack);
      throw new InternalServerErrorException('Unable to fetch movies!');
    }
  }
}
