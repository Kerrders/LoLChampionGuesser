import { ChampionImage } from './champion-image.interface';

export interface Champion {
  id: string;
  name: string;
  title: string;
  resource: string;
  genre: string;
  image: ChampionImage;
  gender: string;
  releaseDate: number;
  region: string;
}
