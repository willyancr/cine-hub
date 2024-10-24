
type Genres = {
  id: number;
  name: string;
}

export type SerieDetails = {
  first_air_date: string;
  genres: Genres[];
  id: number;
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  original_language: string
  original_name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
};
