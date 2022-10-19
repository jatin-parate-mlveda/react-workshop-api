export interface IImdb {
  rating: number;
  votes: number;
  id: number;
}

export interface IMovie {
  plot: string;
  genres: string[];
  runtime: number;
  cast: number[];
  post?: string;
  title: string;
  fullplot: string;
  languages: string[];
  released: Date;
  directors: string[];
  writers: string[];
  year: number;
  imdb: IImdb;
  countries: string[];
  type: 'series' | 'movie';
}
