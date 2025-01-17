type Genres = {
  id: number;
  name: string;
};
type Country = {
  country: string;
};
export type MovieDetails = {
  budget: number;
  genres: Genres[];
  id: number;
  origin_country: Country[];
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  status: string;
  title: string;
  name: string;
  vote_average: number;
  media_type: string
};
