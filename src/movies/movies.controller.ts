import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
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
  async getAllMovies() {
    return await this.moviesService.getAll();
  }
}
