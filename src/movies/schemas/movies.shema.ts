import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { IMovie } from '../interfaces/movie.interface';
import { Imdb, ImdbSchema } from './imdb.schema';

export type MovieDocument = Document & Movie;

@Schema({ versionKey: false })
export class Movie implements IMovie {
  @ApiProperty()
  @Prop()
  plot: string;

  @ApiProperty()
  @Prop()
  genres: string[];

  @ApiProperty()
  @Prop()
  runtime: number;

  @ApiProperty()
  @Prop()
  cast: number[];

  @ApiProperty({ required: false, type: String })
  @Prop({ type: String })
  post?: string | undefined;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  fullplot: string;

  @ApiProperty()
  @Prop()
  languages: string[];

  @ApiProperty()
  @Prop()
  released: Date;

  @ApiProperty()
  @Prop()
  directors: string[];

  @ApiProperty()
  @Prop()
  writers: string[];

  @ApiProperty()
  @Prop()
  year: number;

  @ApiProperty({ type: Imdb })
  @Prop({ type: ImdbSchema })
  imdb: Imdb;

  @Prop()
  countries: string[];

  @Prop()
  type: 'series' | 'movie';
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
