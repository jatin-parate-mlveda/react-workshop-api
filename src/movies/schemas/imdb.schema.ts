import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IImdb } from '../interfaces/movie.interface';

@Schema()
export class Imdb implements IImdb {
  @ApiProperty()
  @Prop()
  rating: number;

  @ApiProperty()
  @Prop()
  votes: number;

  @ApiProperty()
  @Prop()
  id: number;
}

export const ImdbSchema = SchemaFactory.createForClass(Imdb);
