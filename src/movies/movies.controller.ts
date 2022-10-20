import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { GetMoviesQueryDto } from './dtos/get-movies-query.dto';
import { MoviesService } from './movies.service';
import { Movie } from './schemas/movies.shema';

@ApiTags('Movies')
@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @ApiOkResponse({ type: Movie })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllMovies(@Query() queryDto: GetMoviesQueryDto) {
    return await this.moviesService.getAll(queryDto);
  }
}
