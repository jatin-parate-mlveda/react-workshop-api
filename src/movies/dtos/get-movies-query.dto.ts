import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

const sortOptions = ['genres', 'cast', 'title', 'year', 'imdb.rating'] as const;
const sortOrderOptions = ['asc', 'desc'];

const transformToNumber = (params: TransformFnParams) => {
  if (!params.value) {
    return params.value;
  }

  return Number.parseInt(params.value as string, 10);
};

export class GetMoviesQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(transformToNumber)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(1)
  limit?: number;

  @ApiProperty({ enum: sortOptions })
  @IsNotEmpty()
  sort: typeof sortOptions[number];

  @ApiProperty({ enum: sortOrderOptions })
  @IsNotEmpty()
  @IsIn(sortOrderOptions)
  sortOrder: typeof sortOrderOptions[number];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  searchText?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(transformToNumber)
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0)
  skip?: number;
}
